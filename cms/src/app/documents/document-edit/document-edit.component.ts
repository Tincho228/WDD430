import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument:Document;
  document:Document;
  editMode:boolean = false;
  id:number;
  constructor(
    private documentService:DocumentService, 
    private router:Router, 
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = params["id"];
      console.log(this.id)
      if((this.id === undefined) || (this.id === null)){
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(this.id);
      if((this.originalDocument === undefined) || (this.originalDocument === null) ){
        this.editMode = false;
        return;
      }else{
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    })  
  }
  onSubmit(form:NgForm){
    const value = form.value;
    var newDocument = new Document(this.id, value.name, value.description,value.url,[]) 
    if(this.editMode === true){
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }else{
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }
  onCancel(){
    this.router.navigate(['./documents']);
  }
}
