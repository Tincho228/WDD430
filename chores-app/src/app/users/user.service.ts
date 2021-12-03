import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = "http://localhost:3000/user"
  constructor(private http:HttpClient) { }

  signUp(user:User){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<{ message: string, user: Document }>(this.URL + "/signup", user, { headers: headers })
    .subscribe(
      (responseData) => {
        console.log(responseData);
      }
    )
  }
}
