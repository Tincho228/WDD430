import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../users/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../users/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  user:User
  subscription:Subscription
  error:string =null
  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.subscription = this.userService.errorMessageEvent.subscribe(
      (errorMessage)=>{
        this.error = errorMessage
      }
    )
  }
  onSignin(form:NgForm){
    const value = form.value;
    var imgUrl:string = "../../../assets/images/kidone.png"
    var newUser = new User(null,value.name, value.password,false, imgUrl)
    this.userService.signIn(newUser)
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }
}
