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
  id:string;
  constructor(
              private route:ActivatedRoute,
              private contactService:ContactService,
              private router:Router
              ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.groupContacts=[];
        const id_number = +params['id']
        this.id = id_number.toString();
        this.contact = this.contactService.getContact(this.id)
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
