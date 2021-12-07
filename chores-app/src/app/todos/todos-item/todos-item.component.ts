import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styleUrls: ['./todos-item.component.css']
})
export class TodosItemComponent implements OnInit {
  @Input() todo:Todo
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
