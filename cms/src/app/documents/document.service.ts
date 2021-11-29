import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  documents:Document[]=[];
  maxDocumentId:number;
  result:Document;
  constructor(private http:HttpClient) {
    this.maxDocumentId = this.getMaxId();
  } 
  getDocuments():Document[]{
   this.http
   .get('http://localhost:3000/documents')
   .subscribe(
      // success method
      (documents: Document[] ) => {
          //converting json object into an array
          var result=[]
          for(var i in documents){
            result.push([i,documents[i]])
          }
          this.documents = result[0][1]
          this.maxDocumentId = this.getMaxId();
          
          // sort the array
          this.documents.sort(compare)
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
          // // emit the next document list change event
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
    
  }

  addDocument(newDocument:Document){
    if(!newDocument) {
      return;
    }

      // make sure id of the new Document is empty
      newDocument.id = null;
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
      // add to database
      this.http.post<{ message: string, newDocument: Document }>('http://localhost:3000/documents',
        newDocument,
        { headers: headers })
        .subscribe(
          (responseData) => {
            // add new document to documents
            var data=[]
            for(var i in responseData){
              data.push([i,responseData[i]])
            }
            this.documents.push(data[1][1])
            console.log(this.documents)
            
          // sort the array
          this.documents.sort(compare)
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
          // // emit the next document list change event
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
    
  }
  
}
