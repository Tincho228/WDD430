import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact:Contact;
  contact:Contact;
  groupContacts: Contact[] = [];
  editMode:boolean = false;
  id:string;
  noDraggable:boolean = false;
  constructor(
    private contactService:ContactService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = params["id"];
      if((this.id === null) || (this.id === undefined)){
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContactByIndex(+this.id);
      if((this.originalContact === null) || (this.originalContact === undefined)){
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      if(this.originalContact.group){
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
      }
      
    })
  }
  onSubmit(form:NgForm){
    const value = form.value;
    
    var newContact = new Contact(this.id, value.name, value.email, value.phone, value.imageUrl, null )
    if(this.editMode === true){
      this.contactService.updateContact(this.originalContact, newContact);
    }else{
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }
  onCancel(){
    this.router.navigate(["./contacts"])
  }
  isInvalidContact(newContact: Contact) {
    
    if (!newContact) {// newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
       return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
       
       if (newContact.id === this.groupContacts[i].id) {
         return true;
      }
    }
    return false;
  }
  addToGroup($event:any){
    const selectedContact:Contact=$event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if(invalidGroupContact){
      this.noDraggable = true;
      return;
    }
    this.noDraggable = false;
    this.groupContacts.push(selectedContact);
    /* UPDATE THE CONTACT INTO THE SERVICE */
    this.contact.group = this.groupContacts;
    this.contactService.updateContact(this.originalContact,this.contact);
  }
  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
       return;
    }
    this.noDraggable = false;
    this.groupContacts.splice(index, 1);
    /* UPDATE THE CONTACT INTO THE SERVICE */
    this.contact.group = this.groupContacts;
    this.contactService.updateContact(this.originalContact,this.contact)
  }
}
