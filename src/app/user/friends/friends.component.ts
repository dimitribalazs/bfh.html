import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/dto/user';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../userService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends: Observable<User[]>;
  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.friends = this.userService.getFriends();
  }

  onSelect(user: User) {
    // this.router.navigate(['user', user.id]);

    this.router.navigate(['user', user.id]);
  }

}
