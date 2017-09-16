import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/dto/user';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../userService';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  onSelect(user: User) {
    // console.log(user.id)
    this.router.navigate(['/user', user.id]);


    this.userService.loadUser(user.id);
  }

}
