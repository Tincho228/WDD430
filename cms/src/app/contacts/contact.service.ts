import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>(); 

  contacts:Contact[]=[];
  constructor() { 
    this.contacts = MOCKCONTACTS;
  }
  /* get the full list of contacts*/
  getContacts():Contact[]{
    return this.contacts.slice();
  }
  /* get a specific contact by index - THIS IS USED IN THE CONTACTS COMPONENT*/
  getContactByIndex(index:number){
    return this.contacts[index];
  }

  /* get a specific contact by id - THIS ONE IS USED IN THE MESSAGES COMPONENT*/
  getContact(id:string):Contact{
    if(this.contacts.filter(contact => contact.id === id)[0]){
      return this.contacts.filter(contact => contact.id === id)[0];
    }else{
      return null;
    }
  }
  deleteContact(contact:Contact){
    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}
