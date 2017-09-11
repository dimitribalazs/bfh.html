import {Component, Input, NgModule, OnInit} from '@angular/core';
import {MenuService, MenuState} from '../../services/menu.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})


export class MenuBarComponent {
  @Input() menuState;

  menuService: MenuService;
  toggleMenu = false;

  constructor(menuService: MenuService) {
    this.menuService = menuService;
    this.menuService.state$.subscribe(data => {
      this.menuState = data;
    });
  }

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  historyBack() {
    history.back();
  }
}
