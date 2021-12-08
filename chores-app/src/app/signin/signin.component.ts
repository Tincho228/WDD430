import { Component, OnInit } from '@angular/core';
import { User } from '../users/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user:User
  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
  }
  onSignin(form:NgForm){
    const value = form.value;
    var newUser = new User(null,value.name, value.password,false)
    this.userService.signIn(newUser)
  }
}
