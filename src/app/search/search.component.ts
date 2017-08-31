import { Component, OnInit } from '@angular/core';
import {MenuService} from '../shared/services/menu.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  menu: MenuService;
  constructor(private menuService: MenuService) {
    this.menu = menuService;
    this.menu.visibleHomeLink = true;
    this.menu.visibleSearchLink = false;
    this.menu.visibleTitle = false;
    this.menu.visibleSearchInput = true;
    this.menu.visibleEdit = false;
  }

  ngOnInit() {
  }

}
