import { Component } from '@angular/core';
import {MenuService} from './shared/services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  menu: MenuService;
  constructor(private menuService: MenuService) {
    this.menu = menuService;
    this.menu.TitleText = 'Duff\'d';
    this.menu.visibleHomeLink = false;
    this.menu.visibleSearchLink = true;
  }
}
