import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserItemService } from './user-item.service';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  users:User[]=[]
  private subscription:Subscription
  constructor(
    private userItemService:UserItemService
  ) { }

  ngOnInit(): void {
    this.users = this.userItemService.getUsers()
    this.subscription = this.userItemService.userListChangedEvent.subscribe(
      (users)=>{
        this.users = users
        console.log(users)
      }
    )
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
