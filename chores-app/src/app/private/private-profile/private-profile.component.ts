import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/todos/todo.model';
import { UserItemService } from 'src/app/users/user-item.service';
import { User } from 'src/app/users/user.model';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-private-profile',
  templateUrl: './private-profile.component.html',
  styleUrls: ['./private-profile.component.css']
})
export class PrivateProfileComponent implements OnInit {
  
  users:User[]=[]
  currentUser:User
  executer_id:number
  constructor(
    private userItemService:UserItemService,
    private userService:UserService
  ) { }

  async ngOnInit() {
    this.users = await this.userItemService.waitedUsers()
    this.executer_id = this.userService.getUserId()
    this.userItemService.getContact(this.executer_id)
    this.currentUser = this.userItemService.getContact(this.executer_id)
  }

}
