import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [ ]
  waitedContacts:Contact[]=[]
  constructor(private messagesService:MessageService) { }

  ngOnInit(): void {
    this.messages=this.messagesService.getMessages();
    this.messagesService.messageChangedEvent.subscribe( 
      (messages:Message[])=>{
        this.messages = messages;
      }
    );
  }
  
}
