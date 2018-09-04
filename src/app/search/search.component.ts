import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

@Pipe({
  name: 'searchfilter'
})

export class SearchComponent implements PipeTransform {

  searchText = '';

  // Resets the search bar if the user clicks away
  inputBlur(e) {
    if (e.relatedTarget === null) {
      this.searchText = '';
    }
  }

  // Transform pipe for the search dropdown
  transform(value: any, input: string) {
    if (input) {
      input = input.toLowerCase();
      return value.filter(function (element: any) {
        return element.toLowerCase().includes(input);
      });
    }
    return value;
  }

  constructor(public dataService: DataService) {

  }
}
