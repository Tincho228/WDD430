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
    return this.http.post<{ message: string, user: Document, token:string }>(this.URL + "/signup", user)
    .subscribe(
      (responseData) => {
        localStorage.setItem("token", responseData.token)
        this.router.navigate(['/private'])
      }
    )
  }
  signIn(user:User){
    return this.http.post<{ message: string, token: string }>(this.URL + "/signin", user)
    .subscribe(
      (responseData) => {
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
  logOut(){
    localStorage.removeItem("token")
    this.router.navigate(['/signin'])
  }
}
