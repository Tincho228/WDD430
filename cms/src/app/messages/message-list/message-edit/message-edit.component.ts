import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../message.model';
import { MessageService } from '../../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  currentSender = '101';
  constructor(private messageService:MessageService) { }

  ngOnInit(): void {
  }
  onSendMessage(){
    
     const id = ""+(new Date()).getTime()+"";
     const subject = this.subjectRef.nativeElement.value;
     const msgText = this.msgTextRef.nativeElement.value;
     const newMessage = new Message(id,subject,msgText,this.currentSender);
     this.messageService.addMessage(newMessage);
     this.onClear();
    
  }
  onClear(){
    this.msgTextRef.nativeElement.value = '';
    this.subjectRef.nativeElement.value = '';
  }
}
