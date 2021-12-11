import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/todos/todo.model';
import { TodosService } from 'src/app/todos/todos.service';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-private-item',
  templateUrl: './private-item.component.html',
  styleUrls: ['./private-item.component.css']
})
export class PrivateItemComponent implements OnInit {
  @Input() todo:Todo
  constructor(
    private todoService:TodosService,
    private userService:UserService
  ) { }

  ngOnInit(): void {

  }
  onFinish(todoId:number){
    const status = "waiting";
    const userId = this.userService.getUserId()
    const originalTodo = this.todoService.getTodoById(todoId)
    this.todoService.startTodo(originalTodo,userId,status)
  }
}
