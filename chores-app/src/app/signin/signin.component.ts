import { Component, OnInit } from '@angular/core';
import { User } from '../users/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user:User
  
  constructor() { }

  ngOnInit(): void {
  }

}
