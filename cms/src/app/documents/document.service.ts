import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  documents:Document[]=[];
  maxDocumentId:number;
  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments():Document[]{
    return this.documents.slice();
  }

  getDocument(id:number){
    return this.documents[id];
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  addDocument(newDocument:Document){
    if(!newDocument) {
      return;
    }
    this.maxDocumentId++
    newDocument.id = this.maxDocumentId;
    this.documents.push(newDocument);
    const documentsClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsClone);
    
  }
 
  getMaxId():number { 
    let maxId = 0;  
    MOCKDOCUMENTS.forEach(document =>{
      let currentId = parseInt(document.id) /* convert to a number */
      if(currentId>maxId){
      maxId = currentId;
    }
    
    })
    return maxId;
  }
  updateDocument(originalDocument: Document, newDocument: Document) {

    if(!originalDocument || !newDocument || newDocument === null){
      return;
    }
    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);  
  }

}
