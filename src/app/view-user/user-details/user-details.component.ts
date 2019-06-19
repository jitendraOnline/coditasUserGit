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

  ngOnInit() {
  }

  getUserRepo(username){
    this.showRepoFlag=!this.showRepoFlag;
    if(this.userRepo==undefined || this.userRepo==[]){
      this.userService.getUserRepo(username).subscribe((repoList)=>{
        this.userRepo=repoList;
      })
    }
  }
}
