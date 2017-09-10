import { Component, OnInit } from '@angular/core';
import {UserService} from './userService';
import {User} from '../shared/dto/user';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MenuService} from '../shared/services/menu.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: string;
  model: User = new User();
  activeNavigation: number;


  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private menuService: MenuService) {
    this.menuService.setDefault();
    this.menuService.TitleText = 'User info';
    this.menuService.visibleHomeLink = true;
    this.activeNavigation = 0;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      console.log('Load bar:' + params['id']);
      this.id = params['id'];
      this.userService.loadUser(params['id']);
    });

    this.userService.getUser().subscribe((beer) => {
      this.model = this.userService.getViewModel();
    })
  }

  onClick(childView: string, activateNavigation: number) {
    this.router.navigate(['user', this.id, childView]);
    this.activeNavigation = activateNavigation;
  }
}
