import { Component, OnInit } from '@angular/core';
import { UserService } from '../userService';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  constructor(public userService: UserService) { }
}
