
import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos:Todo[]=[]
  documentListChangedEvent = new Subject<Todo[]>();
  private URL = "http://localhost:3000/todo"
  constructor(
    private http:HttpClient
  ) { }
  getTodos(){
    this.http.get<{id:Number;name:String,description:String, executer_id:Number}[]>(this.URL)
    .subscribe(
      (data:Todo[])=>{
        //Converting into an object
        var result=[]
          for(var i in data){
            result.push([i,data[i]])
          }
          this.todos = result[1][1]
        this.documentListChangedEvent.next(this.todos.slice());
      },
      (
        (error:any)=>{
          console.log(error)
        }
      )
    )
    return this.todos.slice();
  }

  //
  
}

  
     
         
        
        
    

