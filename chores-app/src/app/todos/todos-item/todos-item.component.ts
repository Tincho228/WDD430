import { Component, Input, OnInit } from '@angular/core';
import { UserItemService } from 'src/app/users/user-item.service';
import { User } from 'src/app/users/user.model';
import { UserService } from 'src/app/users/user.service';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styleUrls: ['./todos-item.component.css']
})
export class TodosItemComponent implements OnInit {
  @Input() todo:Todo
  users:User[]=[]
  executer:User
  userId:number

  constructor(
    private userItemService:UserItemService,
    private userService:UserService
  ) { }

  async ngOnInit() {
    this.users = await this.userItemService.waitedUsers()
    this.executer = this.userItemService.getContact(this.todo.executer_id)
  }
  onStart(todo_id){
    this.userId = this.userService.getUserId()
    
  }

}
