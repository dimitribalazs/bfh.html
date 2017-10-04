import { Component, OnInit } from '@angular/core';
import { MenuService } from './shared/services/menu.service';
import { ActivatedRoute, ParamMap, Router, RouterState } from '@angular/router';
import { BusinessService } from './shared/services/business.service';
import { NgServiceWorker } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MenuService]
})
export class AppComponent {
  menu: MenuService;

  constructor(private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router,
    businessService: BusinessService,
    private sw: NgServiceWorker) {
    this.menu = menuService;

    // ServiceWorker log
    sw.log().subscribe(log => console.debug('log', log));

    sw.updates.subscribe(u => {
      console.debug('update event', u);

      // Immediately activate pending update
      if (u.type == 'pending') {
        sw.activateUpdate(u.version).subscribe(e => {
          console.debug('updated', e);
          // alert("App updated! Reload App!");
          location.reload();
        });
      }
    });

    sw.checkForUpdate();
  }
}
