/**
 * Created by STRI on 19.09.2017.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {BusinessService} from '../services/business.service';

@Injectable()
export class AuthGuard implements CanActivate {

  isLoggedOn: boolean;
  constructor(private router: Router, private businessService: BusinessService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.isLoggedOn = true;
      const userId: string = JSON.parse(localStorage.getItem('currentUser')).toString()
      if (userId !== this.businessService.currentUser.id.toString()) {
        this.businessService.setCurrentUser(userId);
      }
      return true;
    }
    this.isLoggedOn = false;
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
