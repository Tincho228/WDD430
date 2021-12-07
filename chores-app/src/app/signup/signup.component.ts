import { Component, OnInit } from '@angular/core';
import { User } from '../users/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:User
  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }
  onSignup(form:NgForm){
    const value = form.value;
    
    var newUser = new User(value.name, value.password)
    this.userService.signUp(newUser)
  }
}