import { Component } from '@angular/core';
import { UserItemService } from './users/user-item.service';
import { UserService } from './users/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logged:Boolean
  title = 'chores-app';
  
  constructor(
    public userService:UserService,
    public userItemService:UserItemService
  ){ }
  ngOnInit():void {
    
    
  }  

}
