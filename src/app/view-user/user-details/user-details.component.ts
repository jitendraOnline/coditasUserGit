import { Component, OnInit,Input } from '@angular/core';
import { Item } from 'src/app/shared-module/models/ItemModel';
import { UserService } from 'src/app/shared-module/service/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input('userObject') userDetail: Item;
  constructor(private userService:UserService) { }
  userRepo;
  showRepoFlag:boolean;
  isloading:boolean=false;
  showError:boolean=false;
  errorMessage:string='';

  ngOnInit() {
  }

  getUserRepo(username){
    this.showRepoFlag=!this.showRepoFlag;
    if(this.userRepo==undefined || this.userRepo==[]){
      this.isloading=true;
      this.userService.getUserRepo(username).subscribe((repoList)=>{
        this.isloading=false;
        this.showError=false;
        this.userRepo=repoList;
      },(error)=>{
        this.isloading=false;
        this.showError=true;
        this.errorMessage=error;
      })
    }
  }
}
