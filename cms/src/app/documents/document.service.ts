import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documents:Document[]=[];
  constructor() {
    this.documents = MOCKDOCUMENTS;
   }
  getDocuments():Document[]{
    return this.documents.slice();
  }
  getDocument(id:number){
    return this.documents[id];
  }
}
