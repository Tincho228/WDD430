import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = 'Martin Quintero';
  constructor() { }

  ngOnInit(): void {
  }
  onSendMessage(){
    const id = (new Date()).getTime();
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message(id,subject,msgText,this.currentSender);
    this.addMessageEvent.emit(newMessage);
    this.onClear();
    
  }
  onClear(){
    this.msgTextRef.nativeElement.value = '';
    this.subjectRef.nativeElement.value = '';
  }
}
