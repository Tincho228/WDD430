import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from './user.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  errorMessageEvent = new Subject<string>();
  /*errorMessage: BehaviorSubject<IErrorMsg> = new BehaviorSubject<IErrorMsg>(); */
  private URL = "http://localhost:3000/user"
  constructor(
    private http:HttpClient,
    private router:Router
    ) { }

  signUp(user:User){
    if(!user.name|| !user.password){
      return;
    }
    return this.http.post<{ message: string, user: Document, token:string,userId:number }>(this.URL + "/signup", user)
    .subscribe(
      (responseData) => {
        localStorage.setItem("userId", JSON.stringify(responseData.userId))
        localStorage.setItem("token", responseData.token)
        this.router.navigate(['/private'])
      }
    )
  }
  signIn(user:User){
    return this.http.post<{ message: string, token: string, userId:number }>(this.URL + "/signin", user)
    .subscribe(
      (responseData) => {
        
        localStorage.setItem("userId", JSON.stringify(responseData.userId))
        
        localStorage.setItem("token", responseData.token)
        this.errorMessageEvent.next(null)
        this.router.navigate(['/private'])
      },
      (error)=>{
        this.errorMessageEvent.next(error.error.message)
      }
    )
  }
  loggedIn():Boolean{
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem("token")
  }
  getUserId():number{
    return JSON.parse(localStorage.getItem("userId"))
  }
  logOut(){
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    this.router.navigate(['/signin'])
  }
}
