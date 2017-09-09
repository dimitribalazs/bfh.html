import {Component, NgModule, OnInit} from '@angular/core';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
  providers: [MenuService]
})


export class MenuBarComponent {
  menuService: MenuService;
  toggleMenu = false;

  constructor(menuService: MenuService) {
    this.menuService = menuService;
    menuService.setDefault();
  }

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }
}
