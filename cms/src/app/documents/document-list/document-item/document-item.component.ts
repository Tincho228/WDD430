import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Document } from '../../document.model'
@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<void>();
  @Input() document:Document;
  constructor() { }

  ngOnInit(): void {
  }
  onSelected(){
    this.selectedDocumentEvent.emit();
  }
}
