import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>(); 
  maxContactId:number;
  contacts:Contact[]=[];
  constructor(private http:HttpClient) { 
    this.maxContactId = this.getMaxId();
  }
  /* get the full list of contacts*/
  getContacts():Contact[]{
    this.http
   .get('https://localhost:3000/contacts')
   .subscribe(
      // success method
      (contacts: Contact[] ) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          console.log(this.contacts)
          // sort the array
          contacts.sort(compare)
          function compare(a:Contact, b:Contact) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            // a must be equal to b
            return 0;
          }
          // emit the next document list change event
          this.contactChangedEvent.next(this.contacts.slice()); 
      },
      // error method
      (error: any) => {
          console.log(error.message);
      } 
     
   );
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
    this.storeContacts();
  }
  getMaxId():number { 
    let maxId = 0;  
    this.contacts.forEach(document =>{
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
    this.storeContacts();
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
    this.storeContacts();  
  }
  storeContacts(){
    const headers = new HttpHeaders({'Content-type':'application/json'})
    const convertedContacts = JSON.stringify(this.contacts);
    this.http
    .put('https://angularproject-d66ee-default-rtdb.firebaseio.com/contacts.json', convertedContacts,
    {
      headers: headers
    }
    )
    .subscribe(response => {
      this.contactChangedEvent.next(this.contacts.slice());
    })   
  }
  
}
