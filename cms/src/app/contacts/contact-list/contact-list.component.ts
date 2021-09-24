import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model'
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts : Contact
  
  constructor() {
    new Contact("1","R. Kent Jackson","jacksonk@byui.edu","208-496-3771","../../assets/images/jacksonk.jpg", null),
    new Contact("2","R. Rex Barzee","barzeer@byui.edu","208-496-3768","../../assets/images/barzeer.jpg", null)
   }

  ngOnInit(): void {
  }

}
