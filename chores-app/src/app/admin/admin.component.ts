import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from '../todos/todo.model';
import { TodosService } from '../todos/todos.service';
import { UserItemService } from '../users/user-item.service';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  todos:Todo[]=[]
  subscription:Subscription
  availableTodo:Todo[]=[]
  completedTodo:Todo[]=[]
  incompletedTodo:Todo[]=[]
  waitingTodo:Todo[]=[]

  headers = ["name", "description","executer_id","price","status","accions"]
  constructor(
    private todoService:TodosService,
    private userService:UserService,
    private userItemService:UserItemService

  ) { }

  async ngOnInit() {
    this.todos = await this.todoService.waitedTodos()
    this.subscription = this.todoService.documentListChangedEvent.subscribe(
      (todos)=>{
        this.todos = todos
      }
    )
    //filters
    this.availableTodo = this.todos.filter(todo=>todo.status==="available")
    this.completedTodo = this.todos.filter(todo=>todo.status==="completed")
    this.incompletedTodo = this.todos.filter(todo=>todo.status==="incomplete")
    this.waitingTodo = this.todos.filter(todo=>todo.status==="waiting")
    
  }

}
