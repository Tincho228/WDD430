import { Component, OnInit } from '@angular/core';
import { Todo } from '../todos/todo.model';
import { TodosService } from '../todos/todos.service';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  
  executer_id:number
  constructor(
    private userService:UserService,
    private todoService:TodosService
  ) { }

  ngOnInit(): void {
    this.executer_id = this.userService.getUserId()
    const todos = this.todoService.getTodoByExecuter(this.executer_id)
    console.log(todos)
  }

}
