import { Component, OnInit } from '@angular/core';
import {UserService} from '../userService';
import {User} from '../../shared/dto/user';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  model: User = new User();

  constructor(private userService: UserService) {}

  ngOnInit() {

    this.userService.viewModelSubject.subscribe((beer) => {
      this.model = this.userService.getViewModel();
     })
  }
}
