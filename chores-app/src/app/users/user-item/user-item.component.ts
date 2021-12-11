import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/todos/todo.model';
import { TodosService } from 'src/app/todos/todos.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input()  user:User
  myBudget:number = 0
  myCompleted:number = 0
  myIncompleted:number = 0
  myWaiting:number = 0
  todos:Todo[] = []
  subscription:Subscription
  constructor(
    private todoService:TodosService
  ) { }

  async ngOnInit() {
    this.todos = await this.todoService.waitedTodos();
    this.subscription = this.todoService.documentListChangedEvent.subscribe(
      (todos)=>{
        this.todos = todos
      }
    )
    const myTodos = this.todoService.getTodoByExecuter(this.user.id)
    
    myTodos.forEach(todo=>{
      // calculating money
      if(todo.status === "completed"){
        this.myBudget += todo.price
        this.myCompleted++
      }
      //calculating completed tasks
      if(todo.status === "incomplete"){
        this.myIncompleted++
      }
      if(todo.status === "waiting"){
        this.myWaiting++
      }
    })
    
    
  }
  
    
  
    
}
