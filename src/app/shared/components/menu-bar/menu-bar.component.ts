import {Component, Input, OnInit} from '@angular/core';
import {MenuService, MenuState} from '../../services/menu.service';
import {Router, RouterState} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {BusinessService} from '../../services/business.service';
import {AuthGuard} from '../../_guards/AuthGuard';
import {Constants} from '../../constants';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})

/**
 * This is the main menu bar displayed on top of the application.
 * It subscribes to the [[MenuService]] in order to update itself upon state changes.
 */
export class MenuBarComponent implements OnInit {
  @Input() menuState: MenuState;

  toggleMenu = false;

  constructor(private menuService: MenuService,
              private router: Router,
              private authentication: AuthenticationService,
              private businessService: BusinessService,
              public authGuard: AuthGuard) {
    this.menuState = this.menuService.state;
  }

  ngOnInit(): void {
    this.menuService.state$.subscribe({
      next: data => {
        this.menuState = data;
      }
    });
  }

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  onViewDetails() {
    const state: RouterState = this.router.routerState;
    if (state.snapshot.url.indexOf('beer') > 0 && state.snapshot.url.indexOf('beer') < 5) {
      this.router.navigate([state.snapshot.url, 'edit']);
    } else {
      alert(Constants.NOT_IMPLEMENTED)
    }
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
