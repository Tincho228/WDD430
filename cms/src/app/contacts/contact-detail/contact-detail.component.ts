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
        this.contact = this.contactService.getContactByIndex(this.id);
        if(this.contact.group){
          this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
        }
      }
    )
  }
  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
    
  }

}
