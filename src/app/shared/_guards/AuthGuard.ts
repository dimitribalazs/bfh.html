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
      this.businessService.setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
      return true;
    }
    this.isLoggedOn = false;
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
