import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model'
import { ContactService } from '../contact.service';
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  
})
export class ContactListComponent implements OnInit {
  @Output() contactWasSelected = new EventEmitter<Contact>();
  contacts : Contact[] = []
  contact:Contact[];
  constructor(private contactService:ContactService) {
   }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contact = this.contactService.getContact('3')
    

  }
  selectedContact(contact:Contact){
    this.contactWasSelected.emit(contact);
  }
}
