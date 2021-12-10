import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/todos/todo.model';

@Component({
  selector: 'app-private-item',
  templateUrl: './private-item.component.html',
  styleUrls: ['./private-item.component.css']
})
export class PrivateItemComponent implements OnInit {
  @Input() todo:Todo
  constructor() { }

  ngOnInit(): void {
  }

}
