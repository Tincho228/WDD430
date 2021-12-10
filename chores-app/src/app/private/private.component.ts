import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Todo } from '../todos/todo.model';
import { TodosService } from '../todos/todos.service';
import { UserItemService } from '../users/user-item.service';
import { User } from '../users/user.model';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit, OnDestroy {
  todos:Todo[] = []
  myTodos:Todo[] = []
  myBudget:number
  executer_id:number
  users:User[]
  currentUser:User
  private subscription:Subscription
  constructor(
    private userService:UserService,
    private todoService:TodosService,
    private userItemService:UserItemService
    
  ) { }

  async ngOnInit() {
    this.todos = await this.todoService.waitedTodos();
    this.subscription = this.todoService.documentListChangedEvent.subscribe(
      (todos)=>{
        this.todos = todos
      }
    )
    
    this.users = await this.userItemService.waitedUsers()
    this.executer_id = this.userService.getUserId()
    this.userItemService.getContact(this.executer_id)
    this.currentUser = this.userItemService.getContact(this.executer_id)
    this.myTodos = this.todoService.getTodoByExecuter(this.executer_id)
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe()
      
  }

}
// function myBudget(todos:Todo[]){
//   var result=0;
//   todos.forEach(todo=>{
//     result += todo.price
//   })
//   return result

// }
