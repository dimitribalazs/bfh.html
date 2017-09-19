import {Component, Input, OnInit} from '@angular/core';
import {MenuService, MenuState} from '../../services/menu.service';
import {Router, RouterState} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {BusinessService} from '../../services/business.service';
import {AuthGuard} from "../../_guards/AuthGuard";

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})


export class MenuBarComponent implements OnInit {
  @Input() menuState: MenuState;

  toggleMenu = false;

  constructor(private menuService: MenuService,
              private router: Router,
              private authentication: AuthenticationService,
              private businessService: BusinessService,
              private authGuard: AuthGuard) {
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

  onViewDetails() {
    const state: RouterState = this.router.routerState;
    this.router.navigate([state.snapshot.url, 'edit']);
  }


  historyBack() {
    history.back();
  }

  logOut() {
    this.authentication.logout();
    this.authGuard.isLoggedOn = false;
    this.router.navigate(['login']);
  }
}
