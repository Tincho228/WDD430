import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model'
import { ContactService } from '../contact.service';
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  
})
export class ContactListComponent implements OnInit, OnDestroy {
  subscription:Subscription;
  contacts : Contact[] = []
  term:string = "";
  constructor(private contactService:ContactService) {
    
   }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactChangedEvent.subscribe(
      (contacts:Contact[])=>{
        this.contacts = contacts;
      }
    )
  }
  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }
  
  search(value: string) {
    this.term = value;
  }
}
