import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../users/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../users/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  user:User
  id:number
  subscription:Subscription
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.subscription = this.userService.errorMessageEvent.subscribe(
      (errorMessage)=>{
        console.log(errorMessage)
      }
    )
  }
  onSignup(form:NgForm){
    const value = form.value;
    this.id = Date.now()
    var imgUrl:string = "../../../assets/images/placeholder.png"
    var newUser = new User(this.id,value.name, value.password,false,imgUrl)
    this.userService.signUp(newUser) 
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }
}
