import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts:Contact[]=[];
  constructor() { 
    this.contacts = MOCKCONTACTS;
  }
  getContacts():Contact[]{
    return this.contacts.slice();
  }
  /* get a specific contact by id */

  getContact(id:string):Contact[]{
    return this.contacts.filter(contact => contact.id === id);
    // getContact(id: string): Contact {
    //   FOR each contact in the contacts list
    //   IF contact.id equals the id THEN
    //   RETURN contact
    //   ENDIF
    //   ENDFOR
    //   RETURN null
    //  } 
    
  }
}
