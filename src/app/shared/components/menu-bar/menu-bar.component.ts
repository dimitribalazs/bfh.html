import {Component, Input, OnInit} from '@angular/core';
import {MenuService, MenuState} from '../../services/menu.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})


export class MenuBarComponent implements OnInit {
  @Input() menuState: MenuState;

  menuService: MenuService;
  toggleMenu = false;

  constructor(menuService: MenuService) {
    this.menuService = menuService;


    this.menuState = this.menuService.state;
  }

  ngOnInit(): void {
    this.menuService.state$.subscribe({
      next: data => {
        console.log(data);
        this.menuState = data;
      }
    });
  }

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  historyBack() {
    history.back();
  }
}
