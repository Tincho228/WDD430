import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>(); 
  maxContactId:number;
  contacts:Contact[]=[];
  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
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
    this.contactChangedEvent.next(this.contacts.slice());
  }
  getMaxId():number { 
    let maxId = 0;  
    MOCKCONTACTS.forEach(document =>{
      let currentId = parseInt(document.id) /* convert to a number */
      if(currentId>maxId){
      maxId = currentId;
    }
    
    })
    return maxId;
  }
  addContact(newContact:Contact){
    if(!newContact) {
      return;
    }
    this.maxContactId++
    newContact.id = (this.maxContactId).toString();
    this.contacts.push(newContact);
    const contactClone = this.contacts.slice();
    this.contactChangedEvent.next(contactClone);
  }
  updateContact(originalContact: Contact, newContact: Contact) {

    if(!originalContact || !newContact || newContact === null){
      return;
    }
    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice();
    this.contactChangedEvent.next(contactsListClone);  
  }
}
