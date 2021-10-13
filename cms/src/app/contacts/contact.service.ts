import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelectedEvent = new EventEmitter<Contact>(); 

  contacts:Contact[]=[];
  constructor() { 
    this.contacts = MOCKCONTACTS;
  }
  /* get the full list of contacts*/
  getContacts():Contact[]{
    return this.contacts.slice();
  }


  /* get a specific contact by id */
  getContact(id:string):Contact{
    if(this.contacts.filter(contact => contact.id === id)[0]){
      return this.contacts.filter(contact => contact.id === id)[0];
    }else{
      return null;
    }
  }
}
