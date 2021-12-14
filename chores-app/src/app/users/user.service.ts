import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from './user.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = "http://localhost:3000/user"
  constructor(
    private http:HttpClient,
    private router:Router
    ) { }

  signUp(user:User){
    if(!user.name|| !user.password){
      return;
    }
    return this.http.post<{ message: string, user: Document, token:string }>(this.URL + "/signup", user)
    .subscribe(
      (responseData) => {
        var currentUser = JSON.stringify(responseData)
        localStorage.setItem("currentUser", currentUser)
        localStorage.setItem("token", responseData.token)
        this.router.navigate(['/private'])
      }
    )
  }
  signIn(user:User){
    console.log(user)
    return this.http.post<{ message: string, token: string, userId:number }>(this.URL + "/signin", user)
    .subscribe(
      (responseData) => {
        
        localStorage.setItem("userId", JSON.stringify(responseData.userId))
        
        localStorage.setItem("token", responseData.token)
        
        this.router.navigate(['/private'])
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
