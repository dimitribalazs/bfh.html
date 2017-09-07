import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Beer} from '../../shared/dto/beer';
import {UserService} from "../userService";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favorurites: Observable<Beer[]>;
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.favorurites = this.userService.getFavorurites();
  }
}
