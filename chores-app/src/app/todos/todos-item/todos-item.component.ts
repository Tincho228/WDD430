import { Component, Input, OnInit } from '@angular/core';
import { UserItemService } from 'src/app/users/user-item.service';
import { User } from 'src/app/users/user.model';
import { UserService } from 'src/app/users/user.service';
import { Todo } from '../todo.model';
import { TodosService } from '../todos.service';

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
  originalTodo:Todo
  

  constructor(
    private userItemService:UserItemService,
    private userService:UserService,
    private todoService:TodosService
  ) { }

  async ngOnInit() {
    this.users = await this.userItemService.waitedUsers()
    this.executer = this.userItemService.getContact(this.todo.executer_id)
  }
  onStart(todo_id){
    const status = "incomplete"
    this.userId = this.userService.getUserId()
    this.originalTodo = this.todoService.getTodoById(todo_id)
    this.todoService.startTodo(this.originalTodo,this.userId, status)
  }
}
