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
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<{ message: string, user: Document, token:string }>(this.URL + "/signup", user, { headers: headers })
    .subscribe(
      (responseData) => {
        console.log(responseData);
        localStorage.setItem("token", responseData.token)
        this.router.navigate(['/private'])
      }
    )
  }
  signIn(user:User){
    console.log("The service is receiving " , user)
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<{ message: string, token: string }>(this.URL + "/signin", user, { headers: headers })
    .subscribe(
      (responseData) => {
        console.log(responseData);
        localStorage.setItem("token", responseData.token)
        this.router.navigate(['/private'])
      }
    )
  }
  loggedIn():Boolean{
    return !!localStorage.getItem('token')
  }
}
