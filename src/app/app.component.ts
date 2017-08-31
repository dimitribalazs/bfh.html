import { Component } from '@angular/core';
import {MenuService} from './shared/services/menu.service';
import { NgServiceWorker, NgPushRegistration } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  menu: MenuService;
  constructor(private menuService: MenuService, private sw: NgServiceWorker) {
    this.menu = menuService;
    this.menu.TitleText = 'Duff\'d';
    this.menu.visibleHomeLink = false;
    this.menu.visibleSearchLink = true;

    // ServiceWorker log
    sw.log().subscribe(log => console.debug('log', log));
  
    sw.updates.subscribe(u => {
      console.debug('update event', u);

      // Immediately activate pending update
      // if (u.type == 'pending') {
      //   sw.activateUpdate(u.version).subscribe(e => {
      //     console.debug('updated', e);
      //     alert("App updated! Reload App!");
      //     // location.reload();
      //   });
      // }
    });

    sw.checkForUpdate();
  }
}
