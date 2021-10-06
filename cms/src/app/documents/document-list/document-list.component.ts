import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() documentWasSelected = new EventEmitter<Document>();

  documents : Document[] = [
    new Document(1,"John","First Document to display","Document url",["child 1","child 2"]),
    new Document(1,"Martin","Second Document to display","Document url",["child 1","child 2"]),
    new Document(1,"James","Third Document to display","Document url",["child 1","child 2"]),
    new Document(1,"Michael","Four Document to display","Document url",["child 1","child 2"]),
  ]
  constructor() { }

  ngOnInit(): void {
  }
  selectedDocument(document:Document){
    this.documentWasSelected.emit(document);
  }
}
