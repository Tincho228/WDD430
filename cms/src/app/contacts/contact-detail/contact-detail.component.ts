import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model'
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  groupContacts:Contact[] = [];
  originalContact:Contact;
  contact:Contact;
  id:number;
  constructor(
              private route:ActivatedRoute,
              private contactService:ContactService,
              private router:Router
              ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.groupContacts=[];
        this.id = +params['id']
        this.originalContact = this.contactService.getContactByIndex(this.id);
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        if(this.originalContact.group){
          this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
        }
      }
    )
  }
  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
    
  }

}
