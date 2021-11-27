import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  documents:Document[]=[];
  maxDocumentId:number;
  constructor(private http:HttpClient) {
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments():Document[]{
   this.http
   .get('http://localhost:3000/documents')
   .subscribe(
      // success method
      (documents: Document[] ) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          // sort the array
          documents.sort(compare)
          function compare(a:Document, b:Document) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            // a must be equal to b
            return 0;
          }
          // emit the next document list change event
            
          this.documentListChangedEvent.next(this.documents.slice()); 
      },
      // error method
      (error: any) => {
          console.log(error.message);
      } 
     
   );
    
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
    this.storeDocuments();
  }

  addDocument(newDocument:Document){
    if(!newDocument) {
      return;
    }


    // this.maxDocumentId++
    // newDocument.id = this.maxDocumentId;
    // this.documents.push(newDocument);
    // this.storeDocuments();
  
      // make sure id of the new Document is empty
      newDocument.id = null;
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
      // add to database
      this.http.post<{ message: string, newDocument: Document }>('http://localhost:3000/documents',
        document,
        { headers: headers })
        .subscribe(
          (responseData) => {
            // add new document to documents
            this.documents.push(responseData.newDocument);
            this.documentListChangedEvent.next(this.documents.slice());
          }
        );
    
    
  }
 
  getMaxId():number { 
    let maxId = 0;  
    this.documents.forEach(document =>{
      let currentId = (document.id) /* convert to a number */
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
    this.storeDocuments();
  }
  storeDocuments(){
    const headers = new HttpHeaders({'Content-type':'application/json'})
    const convertedDocuments = JSON.stringify(this.documents);
    this.http
    .put('https://angularproject-d66ee-default-rtdb.firebaseio.com/documents.json', convertedDocuments,
    {
      headers: headers
    }
    )
    .subscribe(response => {
      this.documentListChangedEvent.next(this.documents.slice());
    })   
  }
}
