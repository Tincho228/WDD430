import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(1,"The new contact","First Message to display","Brother Johnson"),
    new Message(2,"Starting point","Second Message to display","Brother Murdock"),
    new Message(3,"Moving around","Third Message to display","Brother Mattlock"),
    new Message(4,"Last step","Fourth Message to display","Sister Gillian"),
  ]
  constructor() { }

  ngOnInit(): void {
  }
  onAddMessage(message: Message){
    this.messages.push(message);
  }
}
