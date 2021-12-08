import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from './todo.model';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnDestroy {
  todos:Todo[]=[]
  private subscription:Subscription;
  constructor(
    private todosService:TodosService
  ) { }

  ngOnInit(): void {
    this.todos = this.todosService.getTodos();
    this.subscription = this.todosService.documentListChangedEvent.subscribe(
      (todos)=>{
        this.todos = todos
      }
    )

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
