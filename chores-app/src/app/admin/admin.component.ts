import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Todo } from '../todos/todo.model';
import { TodosService } from '../todos/todos.service';
import { UserItemService } from '../users/user-item.service';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  todos:Todo[]=[]
  subscription:Subscription
  availableTodo:Todo[]=[]
  completedTodo:Todo[]=[]
  incompletedTodo:Todo[]=[]
  waitingTodo:Todo[]=[]
  open:Boolean = false
  @ViewChild('template') actionButton:ElementRef

  headers = ["name", "description","executer_id","price","status","accions"]
  constructor(
    private todoService:TodosService,
    private userService:UserService,
    private userItemService:UserItemService,
    private elementRef:ElementRef

  ) { }

  async ngOnInit() {
    this.todos = await this.todoService.waitedTodos()
    this.subscription = this.todoService.documentListChangedEvent.subscribe(
      (todos)=>{
        this.todos = todos
        this.filterTodo()
      }
    )
    //filters
    this.filterTodo()
    
  }
  openForm(){
    this.open= true;
  }
  closeForm(){
    this.open = false;
  }
  onSubmit(form:NgForm){
    const value = form.value;
    const id = Date.now()
    const status = "available"
    var newUser = new Todo(id,value.name, value.description, null, value.price ,status)

    this.todoService.addTodo(newUser)
    //close de form
    this.open = false
  }
  onModalDelete(todoId:number, todoName:string){
    // Fill the Modal
    document.getElementById("exampleModalTitle").textContent =`Delete Task`
    document.getElementById("exampleModalContent").textContent =`Do you want to delete ${todoName}?`
    // trigger the modal
    this.actionButton.nativeElement.innerHTML = `<button type="button" id="my-button" data-id=${todoId} class="btn btn-secondary" data-dismiss="modal" (click)="onDelete(e)">Delete</button>`
    this.elementRef.nativeElement.querySelector('#my-button').addEventListener('click', this.onDelete.bind(this));
    document.getElementById("openModalButton").click()
    
  }
  onDelete(e){
    const todoId = e.target.dataset.id
    this.todoService.deleteTodo(todoId)
  }
  onModalApprove(todoId:number, todoName:string, todoExecuter:number){
    // Fill the Modal
    document.getElementById("exampleModalTitle").textContent =`Approve Task`
    document.getElementById("exampleModalContent").textContent =`Do you want to approve ${todoName}?`
    this.actionButton.nativeElement.innerHTML = `<button type="button" id="my-button" data-executer=${todoExecuter} data-id=${todoId} class="btn btn-secondary" data-dismiss="modal" (click)="onApprove(e)">Approve</button>`
    this.elementRef.nativeElement.querySelector('#my-button').addEventListener('click', this.onApprove.bind(this));
    document.getElementById("openModalButton").click()
  }
  onApprove(e){
    const status = "completed"
    const todoId = e.target.dataset.id
    const executer = e.target.dataset.executer
    // set the winner´s id
    const originalTodo = this.todoService.getTodoById(parseInt(todoId))
    this.todoService.approveTodo(originalTodo, executer, status)

  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }
  filterTodo(){
    this.availableTodo = this.todos.filter(todo=>todo.status==="available")
    this.completedTodo = this.todos.filter(todo=>todo.status==="completed")
    this.incompletedTodo = this.todos.filter(todo=>todo.status==="incomplete")
    this.waitingTodo = this.todos.filter(todo=>todo.status==="waiting")
  }
}