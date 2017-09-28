import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/dto/user';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../userService';
import {Router, ActivatedRoute} from '@angular/router';
import {BusinessService} from '../../shared/services/business.service';

const USER_CURRENT_NO_FRIENDS = 'You have no friends!';
const USER_CURRENT_GET_OUT    = 'We suggest, you get out and have a few beers.';
const USER_FOREIGN_NO_FRIENDS = 'This user has no friends';
const USER_FOREIGN_GET_OUT    = 'If you meet him, have a beer together!';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  hasFriends = true;
  txtNoFriends = USER_FOREIGN_NO_FRIENDS;
  txtGetOut = USER_FOREIGN_GET_OUT;

  constructor(public userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private businessService: BusinessService) {
  }

  ngOnInit() {
    this.userService.viewModel.friends.subscribe(friends => {
      this.hasFriends = friends.length > 0

      if (this.businessService.currentUser.id === this.userService.viewModel.id) {
        this.txtNoFriends = USER_CURRENT_NO_FRIENDS;
        this.txtGetOut = USER_CURRENT_GET_OUT;
      }
    })
  }

  onSelect(user: User) {
    // console.log(user.id)
    this.router.navigate(['/user', user.id]);

    this.userService.loadUser(user.id);
  }

}
