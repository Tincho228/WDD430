import { GeneratedFile } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../../message.model';


@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  contacts:Contact[]
  messageSender:string;
  @Input() message : Message;

  constructor(private contactService:ContactService ) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts()
    const contact:Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
    

    }
    
  }
  
    

    
    
  


