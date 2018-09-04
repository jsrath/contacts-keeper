import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  id: number;
  disabled = true;
  contact = {
    id: 0,
    name: '',
    email: '',
    phone: ''
  };

  editProfile() {
    this.disabled = false;
  }

  onSubmit({ value, valid }) {
    if (valid) {
      this.deleteContact(this.id);
      this.dataService.contacts[0].push(value);
    } else {
      alert('Form is invalid');
    }
  }

  // On delete, locates the delted contact in the array and removes it
  deleteContact(id) {
    const check = confirm('Are you sure you want to alter your contacts?');
    if (check) {
      this.dataService.contacts[0].splice(this.dataService.contacts[0].indexOf(this.dataService.contacts[0].find(row => row.id === Number(id))), 1);
      this.router.navigateByUrl('/');
    }
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dataService: DataService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.dataService.getContacts().subscribe();
  }
  ngOnInit() {
  }
}
