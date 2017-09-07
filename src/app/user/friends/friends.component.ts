import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/dto/user";
import {Observable} from 'rxjs/Observable';
import {UserService} from "../userService";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends: Observable<User[]>;
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.friends = this.userService.getFriends();
  }

}
