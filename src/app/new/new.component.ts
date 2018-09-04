import { Component, OnInit, OnChanges} from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})

export class NewComponent implements OnInit, OnChanges {

  contact = {
    id:  0,
    name: '',
    email: '',
    phone: ''
  };

  ids: number[] = [];

  // Generates a new contact ID by finding the highest current ID and adding 1
  generateId() {
    this.dataService.contacts[0].forEach(element => {
      this.ids.push(element.id);
    });

    this.contact.id = this.ids.sort((a, b) => a - b).pop() + 1;
  }

  // Validates the form and adds the new contact
  onSubmit({ value, valid }) {
    if (valid) {
      this.dataService.contacts[0].push(value);
      this.router.navigateByUrl('/');

    } else {
      alert('Form is invalid');
    }
  }

  constructor(public dataService: DataService, private router: Router) {
    this.dataService.getContacts().subscribe(() => {
      this.generateId();
    });
  }

  ngOnInit() {
    this.dataService.refreshContacts();
  }

  ngOnChanges() {
    this.generateId();
  }

}
