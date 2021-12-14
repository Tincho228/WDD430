import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserItemService } from 'src/app/users/user-item.service';
import { User } from 'src/app/users/user.model';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit, OnDestroy {
  @ViewChild('template') actionButton:ElementRef
  users:User[]=[]
  subscription:Subscription
  headers =["id","name","admin","delete","activate"]
  constructor(
    private userItemService:UserItemService,
    private elementRef:ElementRef,
    private route:ActivatedRoute
  ) { }

  async ngOnInit() {
    this.users = await this.userItemService.waitedUsers()
    this.subscription = this.userItemService.userListChangedEvent.subscribe(
      (users)=>{
        this.users = users
      }
    )
  }
  onModalDelete(userId:number, userName:string){
      // Fill the Modal
      document.getElementById("exampleModalTitle").textContent =`Delete User`
      document.getElementById("exampleModalContent").textContent =`Do you want to delete ${userName}?`
      // trigger the modal
      this.actionButton.nativeElement.innerHTML = `<button type="button" id="my-button" data-id=${userId} class="btn btn-secondary" data-dismiss="modal" (click)="onDelete(e)">Delete</button>`
      this.elementRef.nativeElement.querySelector('#my-button').addEventListener('click', this.onDelete.bind(this));
      document.getElementById("openModalButton").click()
      
    }
  onDelete(e){
      const todoId = e.target.dataset.id
      console.log(todoId)
      //this.todoService.deleteTodo(todoId)
    }
  onModalActivate(userId:number, userName:string){
    // Fill the Modal
    document.getElementById("exampleModalTitle").textContent =`Activate User`
    document.getElementById("exampleModalContent").textContent =`Do you want to give ${userName} admin permissions?`
    // trigger the modal
    this.actionButton.nativeElement.innerHTML = `<button type="button" id="my-button" data-id=${userId} class="btn btn-secondary" data-dismiss="modal" (click)="onDelete(e)">Activate</button>`
    this.elementRef.nativeElement.querySelector('#my-button').addEventListener('click', this.onActivate.bind(this));
    document.getElementById("openModalButton").click()
  }
  onActivate(e){
    const userId = e.target.dataset.id
    const status = true
    const originalUser = this.userItemService.getContact(parseInt(userId))
    this.userItemService.userActivate(originalUser,userId,status)
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

  }
  

