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
    console.log(this.user.id)
    const myTodos = this.todoService.getTodoByExecuter(this.user.id)
    // calculating money
    myTodos.forEach(todo=>{
      if(todo.status === "completed"){
        this.myBudget += todo.price
      }
    })
    console.log(myTodos)
  }
  
    
  
    
}
