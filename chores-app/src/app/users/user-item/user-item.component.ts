import { Component, Input, OnInit } from '@angular/core';
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
  constructor(
    private todoService:TodosService
  ) { }

  ngOnInit(): void {
    console.log(this.user.id)
    const myTodos = this.todoService.getTodoByExecuter(this.user.id)
    // calculating money
    myTodos.forEach(todo=>{
      if(todo.status === "complete"){
        this.myBudget += todo.price
      }
    })
  }
  
    
  
    
}
