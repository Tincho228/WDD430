
import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos:Todo[]=[]
  documentListChangedEvent = new Subject<Todo[]>();
  private URL = "http://localhost:3000/todo"
  

  constructor(
    private http:HttpClient,
    private router:Router
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
  waitedTodos():any{
    return new Promise(
      (resolve, reject)=>{
        this.http.get(this.URL)
        .subscribe(
          (data:Todo[])=>{
        
          //Converting into an object
          var result=[]
            for(var i in data){
              result.push([i,data[i]])
            }
            this.todos = result[1][1]
          this.documentListChangedEvent.next(this.todos.slice());
          resolve(this.todos.slice());
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
  getTodoById(id:number):Todo{
    if(this.todos.filter(todo => todo.id === id)[0]){
      return this.todos.filter(todo => todo.id === id)[0];
    }else{
      return null;
    }
  }
  getTodoByExecuter(id:number){
    return this.todos.filter(todo => todo.executer_id === id)
  }

  startTodo(originalTodo:Todo, userId:number, status:string) {
    if (!originalTodo || !userId || !status) {
      return;
    }
    const pos = this.todos.findIndex(d => d.id === originalTodo.id);
    if (pos < 0) {
      return;
    }
    return this.http.put<Todo>(this.URL + "/"+ originalTodo.id, {userId:userId, status:status})
    .subscribe(
      (responseData) => {
        const newTodo = originalTodo
        newTodo.status =status
        newTodo.executer_id = userId
        //Converting into an object
        this.todos[pos] = newTodo
        this.documentListChangedEvent.next(this.todos.slice())
        this.router.navigate(['/private'])
      },
      (
        (error:any)=>{
          console.log(error)
        }
      )
    )
  }
  approveTodo(originalTodo:Todo, userId:number, status:string) {
    if (!originalTodo || !userId || !status) {
      return;
    }
    const pos = this.todos.findIndex(d => d.id === originalTodo.id);
    if (pos < 0) {
      return;
    }
    return this.http.put<Todo>(this.URL + "/"+ originalTodo.id, {userId:userId, status:status})
    .subscribe(
      (responseData) => {
        const newTodo = originalTodo
        newTodo.status =status
        newTodo.executer_id = userId
        //Converting into an object
        this.todos[pos] = newTodo
        this.documentListChangedEvent.next(this.todos.slice())
        this.router.navigate(['/admin'])
      },
      (
        (error:any)=>{
          console.log(error)
        }
      )
    )
  }
  deleteTodo(todoId){
    if(!todoId){
      return;
    }
    const pos = this.todos.findIndex(todo=>todo.id === parseInt(todoId))
    if (pos < 0) {
      return;
    }
    return this.http.delete(this.URL + "/"+ todoId)
    .subscribe(
      (responseData) => {
        this.todos.splice(pos, 1);
        this.documentListChangedEvent.next(this.todos.slice())
      },
      (
        (error:any)=>{
          console.log(error)
        }
      )
    )

  }
  
}

  
     
         
        
        
    

