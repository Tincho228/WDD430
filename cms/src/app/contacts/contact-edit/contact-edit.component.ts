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
        console.log(this.groupContacts);
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
}
