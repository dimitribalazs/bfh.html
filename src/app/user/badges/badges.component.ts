import { Component, OnInit } from '@angular/core';
import {UserService} from '../userService';
import {User} from '../../shared/dto/user';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {

  model: User = new User();

  constructor(private userService: UserService) {}

  ngOnInit() {

    this.userService.viewModelSubject.subscribe((beer) => {
      this.model = this.userService.getViewModel();
    })
  }
}
