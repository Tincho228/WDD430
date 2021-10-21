import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document:Document;
  id:number;
  nativeWindow:any;
  constructor(private route:ActivatedRoute, private documentService:DocumentService, private windRefService:WindRefService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    )
      
    this.nativeWindow = this.windRefService.getNativeWindow();
  }
  onView(){
    console.log("hello")
    if(this.document.url){
      this.nativeWindow.open(this.document.url);
      console.log(this.nativeWindow)
    }
  }

}
