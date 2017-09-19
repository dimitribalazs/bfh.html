import { Component } from '@angular/core';
import {MenuService} from './shared/services/menu.service';
import { ActivatedRoute, ParamMap, Router, RouterState  } from '@angular/router';
import {BusinessService} from './shared/services/business.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MenuService]
})
export class AppComponent {

  menu: MenuService;
  constructor(private menuService: MenuService,
              private route: ActivatedRoute,
              private router: Router,
              private businessService: BusinessService) {
    this.menu = menuService;

  }
}
