import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared-module/service/user.service';
import { Subject, of } from 'rxjs';
import { switchMap,distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { searchResult } from '../shared-module/models/searchResult';



@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  userList:searchResult;
  private searchText$ = new Subject<{search:string,pagenumber:number}>();
  private seachedValue:string;
  showPagination:boolean=false;
  sortParamList:string[]=  ["Name (A - Z)","Name (Z - A)","Rank ↑","Rank ↓"];
  isloading:boolean=false;
  showError:boolean=false;
  errorMessage:string='';
  currentFilter:string='';

  constructor(private userService:UserService) { }

  ngOnInit() {
     this.getSearch();
  }

  getSearch(){
    this.searchText$.pipe(
       debounceTime(400),  
       distinctUntilChanged(),
       switchMap((searchedUser) =>{
           this.isloading=true;
           if(this.seachedValue==searchedUser.search && searchedUser.pagenumber==0){
             return of(this.userList);
           }
           else{
             this.seachedValue=searchedUser.search;
             return this.userService.searchUsers(searchedUser.search,searchedUser.pagenumber)
           }

       }  
     )
     )
     .subscribe((serachResult:searchResult)=>{
       this.userList=serachResult;
       if(this.currentFilter!=''){
         this.sortList(this.currentFilter);
       }
       this.isloading=false;
       this.showPagination=true;
     }
     ,
     (error)=>{
       this.isloading=false;
       this.errorMessage=error["message"];
       this.userList={ total_count:0,incomplete_results:false,items:[]},
       this.showError=true;
       this.searchText$ = new Subject<{search:string,pagenumber:number}>();
       this.getSearch();
     })
 }


  search(searchedUser: string) {
    this.showError=false;
    this.showPagination=false;
    searchedUser=searchedUser.trim();
    if(searchedUser!=''){
      console.log(this.seachedValue+"  "+searchedUser);
      this.searchText$.next({
        search:searchedUser,
        pagenumber:0,
      });
    }
    else{
        this.showPagination=true;
        this.userList={ total_count:0,incomplete_results:false,items:[]};
    }
  }

  nextPage(pageEvent){
    this.showError=false;
    this.searchText$.next({
      search:this.seachedValue,
      pagenumber:pageEvent['pageIndex']+1,
    })
    }


  sortList(sortParam){
    console.log("sort value"+sortParam);
    this.currentFilter=sortParam;
    if(sortParam=='Name (A - Z)'){
      this.sortByName('asc');
    }
    else  if(sortParam=='Name (Z - A)'){
      this.sortByName('desc');
    }
    else if(sortParam=='Rank ↑'){
      this.sortByRank('asc');
    }
    else if(sortParam=='Rank ↓'){
      this.sortByRank('desc');
    }

  }

  sortByName(orderParam){
    if(orderParam=='asc'){
      this.userList.items=this.userList.items.sort((a,b)=>{
        let x = a.login.toLowerCase();
        let y = b.login.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
   }
   else{
    this.userList.items=this.userList.items.sort((a,b)=>{
      let x = a.login.toLowerCase();
      let y = b.login.toLowerCase();
      if (x > y) {return -1;}
      if (x < y) {return 1;}
      return 0;
    })
   }
    this.userList={...this.userList}
  }

  sortByRank(orderParam){
    if(orderParam=='asc'){
      this.userList.items=this.userList.items.sort((a,b)=>{
        return a.score - b.score;
      })
      
    }
    else{
      this.userList.items=this.userList.items.sort((a,b)=>{
        return b.score-a.score;
      })  
    }
    this.userList={...this.userList}
  }

}
