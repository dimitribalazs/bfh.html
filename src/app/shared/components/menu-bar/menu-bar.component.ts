import {Component, Input, OnInit} from '@angular/core';
import {MenuService, MenuState} from '../../services/menu.service';
import {Router, RouterState} from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})


export class MenuBarComponent implements OnInit {
  @Input() menuState: MenuState;

  toggleMenu = false;
  menuService: MenuService;

  constructor(menuService: MenuService, private router: Router) {
    this.menuService = menuService;
    this.menuState = menuService.state;
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

  onViewDetails() {
    const state: RouterState = this.router.routerState;
    this.router.navigate([state.snapshot.url, 'edit']);
  }


  historyBack() {
    history.back();
  }
}
