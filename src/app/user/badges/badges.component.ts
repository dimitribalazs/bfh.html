import { Component, OnInit } from '@angular/core';
import {UserService} from '../userService';


@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit() {}
}
