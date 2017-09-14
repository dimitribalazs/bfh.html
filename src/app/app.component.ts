import { Component } from '@angular/core';
import {MenuService} from './shared/services/menu.service';
import { ActivatedRoute, ParamMap, Router, RouterState  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  menu: MenuService;
  constructor(private menuService: MenuService,
              private route: ActivatedRoute,
              private router: Router) {
    this.menu = menuService;
    this.menu.setDefault();
    this.menu.visibleSearchLink = true;
  }
  onViewDetails() {
    const state: RouterState = this.router.routerState;
    this.router.navigate([state.snapshot.url, 'edit']);
  }

  onBack() {
    window.history.back();
  }

}
