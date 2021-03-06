import { Component, OnInit, OnChanges } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})

export class ContactsComponent implements OnInit, OnChanges {

  clickedLetter = '';
  letters = [];

  // Creates a sorted array of unique first letters from the data provided by the data service
  sortLetters() {
    this.dataService.contacts[0].forEach(contact => {
      this.letters.push(contact.name.toUpperCase().slice(0, 1));
    });

    this.letters = this.letters.filter( (elem, index, self) => index === self.indexOf(elem));
  }

  // Sorts all contacts alphabetically by name for display
  sortContacts() {
    this.dataService.contacts[0] = this.dataService.contacts[0].sort((a, b) => a.name.localeCompare(b.name))
  }

  // Redisplays all contacts after filtering and removes red color from the clicked first letter
  resetContacts(e) {
    e.target.nextElementSibling.childNodes.forEach(element => {
      if (element.style) {
        element.style.color = '#444444';
      }
    });
    this.clickedLetter = '';
  }

  // Filters displayed contacts based on the clicked first letter and turns it red
  filterContacts(e) {
    e.target.parentElement.childNodes.forEach(element => {
      if (element.style) {
        element.style.color = '#444444';
      }
    });
    e.target.style.color = '#00897b';
    this.clickedLetter = e.target.innerText.trim();
  }

  constructor(public dataService: DataService) {
    this.dataService.getContacts().subscribe(() => {
      this.sortContacts();
      this.sortLetters();
    });
  }

  ngOnInit() {
    this.dataService.refreshContacts();
  }

  ngOnChanges() {
    this.sortContacts();
    this.sortLetters();
  }

}
