import {Component} from '@angular/core';
import {UserService} from '../userService';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent {
  constructor(public userService: UserService) {
  }
}
