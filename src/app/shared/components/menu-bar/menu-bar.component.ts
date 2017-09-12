import {Component, Input, OnInit} from '@angular/core';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
  providers: [MenuService]
})


export class MenuBarComponent implements OnInit {
  @Input() menuState;

  menuService: MenuService;
  toggleMenu = false;

  constructor(menuService: MenuService) {
    this.menuService = menuService;

    this.menuService.state$.subscribe(data => {
      this.menuState = data;
    });
  }

  ngOnInit(): void {
    this.menuService.setNewState({
      visibleMenu: true,
      visibleSearchLink: true,
      visibleTitle: true
    })
  }

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  historyBack() {
    history.back();
  }
}
