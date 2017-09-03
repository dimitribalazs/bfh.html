import { Component, OnInit } from '@angular/core';
import {MenuService} from '../shared/services/menu.service';

@Component({
  selector: 'app-brewery',
  templateUrl: './brewery.component.html',
  styleUrls: ['./brewery.component.css']
})
export class BreweryComponent implements OnInit {

  constructor(private menuService: MenuService) {
    this.menuService.setDefault();
    this.menuService.TitleText = 'Brewery info';
    this.menuService.visibleHomeLink = true;
    this.menuService.visibleTitle = true;
    this.menuService.visibleEdit = true;
  }

  ngOnInit() {
  }

}
