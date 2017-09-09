import {Component, NgModule, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})


export class MenuBarComponent {
  toggleMenu = false;


  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }
}
