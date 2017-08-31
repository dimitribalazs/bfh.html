import { Component, OnInit } from '@angular/core';
import {MenuService} from '../shared/services/menu.service';

@Component({
  selector: 'app-brewery',
  templateUrl: './brewery.component.html',
  styleUrls: ['./brewery.component.css']
})
export class BreweryComponent implements OnInit {
  menu: MenuService;
  constructor(private menuService: MenuService) {
    this.menu = menuService;
    this.menu.TitleText = 'Brewery info';
    this.menu.visibleHomeLink = true;
    this.menu.visibleSearchLink = false;
    this.menu.visibleTitle = true;
    this.menu.visibleSearchInput = false;
    this.menu.visibleEdit = true;
  }

  ngOnInit() {
  }

}
