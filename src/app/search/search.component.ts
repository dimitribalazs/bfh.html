import { Component, OnInit } from '@angular/core';
import {MenuService} from '../shared/services/menu.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private menuService: MenuService) {
    this.menuService.setDefault();
    this.menuService.visibleHomeLink = true;
    this.menuService.visibleTitle = false;
    this.menuService.visibleSearchInput = true;

    this.menuService.searchInputCallback = (e) => {
      console.log(e.target.value)
    }

  }

  ngOnInit() {
  }

}
