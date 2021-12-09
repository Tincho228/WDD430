import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserItemService {
  users:User[]=[]
  userListChangedEvent = new Subject<User[]>();
  private URL = "http://localhost:3000/user"
  
  constructor(
    private http:HttpClient
  ) { }
  getUsers(){
    this.http.get<{id:Number,name:String,password:String,admin:Boolean}[]>(this.URL)
    .subscribe(
      (data:User[])=>{
        
        //Converting into an object
        var result=[]
          for(var i in data){
            result.push([i,data[i]])
          }
          this.users = result[1][1]
        this.userListChangedEvent.next(this.users.slice());
      },
      (
        (error:any)=>{
          console.log(error)
        }
      )
    )
    return this.users.slice();
  }
  waitedUsers():any{
    return new Promise(
      (resolve, reject)=>{
        this.http.get<{id:Number,name:String,password:String,admin:Boolean}[]>(this.URL)
        .subscribe(
          (data:User[])=>{
        
          //Converting into an object
          var result=[]
            for(var i in data){
              result.push([i,data[i]])
            }
            this.users = result[1][1]
          this.userListChangedEvent.next(this.users.slice());
          resolve(this.users.slice());
        },
        (
          (error:any)=>{
          console.log(error)
        }
      )
    )
      }
    )
  }

  getContact(id:number):User{
    if(this.users.filter(contact => contact.id === id)[0]){
      return this.users.filter(contact => contact.id === id)[0];
    }else{
      return null;
    }
  }
 
}

