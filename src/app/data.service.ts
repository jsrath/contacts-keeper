import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class DataService {
  constructor(public http: HttpClient) {
  }
  contacts: any = [];
  getContacts() {
    return this.http.get('./assets/data.json')
      .pipe(map(res =>
        this.contacts.push(res)));
  }

  refreshContacts() {
    return this.contacts;
  }
}
