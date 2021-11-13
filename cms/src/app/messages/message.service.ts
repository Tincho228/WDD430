
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages:Message[] = [];
  maxMessageId:number; 
  constructor(private http: HttpClient) {
    
   }
  getMessages():Message[]{
    this.http
   .get('https://angularproject-d66ee-default-rtdb.firebaseio.com/messages.json')
   .subscribe(
      // success method
      (messages: Message[] ) => {
          this.messages = messages;
          // emit the next document list change event
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice()); 
      },
      // error method
      (error: any) => {
          console.log(error.message);
      } 
     
   );
    return this.messages.slice();
  }
  getMaxId(){
    let maxId = 0;
    this.messages.forEach(message =>{
      let currentId = parseInt(message.id)
      if(currentId>maxId){
      maxId = currentId;
    }
    
    })
    return maxId;
  }
  
  addMessage(message: Message){
    if(!message) {
      return;
    }
    this.maxMessageId++
    message.id = this.maxMessageId.toString();
    
    this.messages.push(message);
    this.messages
    this.storeMessage();
  }
  storeMessage(){
    const headers = new HttpHeaders({'Content-type':'application/json'})
    const convertedMessages = JSON.stringify(this.messages);
    this.http
    .put('https://angularproject-d66ee-default-rtdb.firebaseio.com/messages.json', convertedMessages,
    {
      headers: headers
    }
    )
    .subscribe(response => {
      this.messageChangedEvent.next(this.messages.slice());
    })   
  }
}
