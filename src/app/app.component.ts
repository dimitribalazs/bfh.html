import { Component, OnInit } from '@angular/core';
import {MenuService} from './shared/services/menu.service';
import { ActivatedRoute, ParamMap, Router, RouterState  } from '@angular/router';
import { NgServiceWorker, NgPushRegistration } from '@angular/service-worker';
import { NotificationService } from './shared/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  menu: MenuService;
  notifications: NotificationService;

  constructor(private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router,
    private sw: NgServiceWorker,
    private notificationService: NotificationService) {
      this.menu = menuService;
      this.menu.setDefault();
      this.menu.visibleSearchLink = true;

    // PushService
    this.notifications = notificationService;
    this.notifications.register();

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
  onViewDetails() {
    const state: RouterState = this.router.routerState;
    this.router.navigate([state.snapshot.url, 'edit']);
  }

  onBack() {
    window.history.back();
  }
}
