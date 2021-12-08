import { Component, Input, OnInit } from '@angular/core';
import { UserItemService } from 'src/app/users/user-item.service';
import { User } from 'src/app/users/user.model';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styleUrls: ['./todos-item.component.css']
})
export class TodosItemComponent implements OnInit {
  @Input() todo:Todo
  users:User[]=[]
  executer:User
  constructor(
    private userItemService:UserItemService
  ) { }

  async ngOnInit() {
    this.users = await this.userItemService.waitedUsers()
    this.executer = this.userItemService.getContact(this.todo.executer_id)
    
  }

}
