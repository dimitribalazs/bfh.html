import { Component, OnInit } from '@angular/core';
import { UserModel } from '../shared/domainModel/viewModels';
import { BusinessService } from '../shared/services/business.service';
import { MenuService } from '../shared/services/menu.service';
import { BehaviorSubject } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from "../shared/services/authentication.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  userModel: Observable<UserModel[]>;
  searchSubject: Subject<String> = new BehaviorSubject<String>('');
  filterSubject: Subject<number> = new BehaviorSubject<number>(4);

  constructor(private businessService: BusinessService,
    private authentication: AuthenticationService,
    private router: Router,
    private menuService: MenuService) {
    this.userModel = new Observable<UserModel[]>();
  }

  ngOnInit() {
    this.menuService.setNewState({
      titleText: 'Login',
      visibleHomeLink: false
    });

    this.menuService.setNewState({
      titleText: 'Duff\'d Login',
      visibleTitle: true,
    });

    this.userModel = this.businessService.getAllUser();
  }

  onSelect(user: UserModel) {
    this.authentication.login(user.id)
    this.businessService.setCurrentUser(user.id);
    this.router.navigate(['home']);
  }
}
