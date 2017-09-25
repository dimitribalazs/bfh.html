import { Component, OnInit, OnChanges } from '@angular/core';
import {UserService} from './userService';
import {User} from '../shared/dto/user';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MenuService, MenuState} from '../shared/services/menu.service';
import {Observable} from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {FriendsComponent} from "./friends/friends.component";
import {BusinessService} from '../shared/services/business.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: string;
  model: User = new User();
  activeNavigation: number;
  user: Observable<User>;

  constructor(public userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private menuService: MenuService,
              private businessService: BusinessService) {
    // this.menuService.setDefault();
    // this.menuService.TitleText = 'User info';
    // this.menuService.visibleHomeLink = true;
    this.activeNavigation = 0;

    // this.user = userService.viewModelSubject;
    // this.user.subscribe((user: User) => this.model = user)

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.userService.loadUser(params['id']);
    });

    this.menuService.setNewState({
      titleText: 'User info',
      visibleHomeLink: true,
      visibleEdit: this.businessService.currentUser.id === this.id
    });
    const child: String = this.route.snapshot.firstChild.firstChild.url.toString();

    if (child === 'favourites') {
      this.activeNavigation = 1;
    }else if (child === 'badges') {
      this.activeNavigation = 2;
    }else if (child === 'detail') {
      this.activeNavigation = 3;
    }
  }

  onClick(childView: string, activateNavigation: number) {
    this.router.navigate(['user', this.id, childView]);
    this.activeNavigation = activateNavigation;
  }
}
