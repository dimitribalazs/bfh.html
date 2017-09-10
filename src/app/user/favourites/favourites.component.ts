import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Beer} from '../../shared/dto/beer';
import {UserService} from '../userService';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favorurites: Observable<Beer[]>;
  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.favorurites = this.userService.getFavorurites();
  }

  // onClick(childView: string, activateNavigation: number) {
  //   this.router.navigate(['user', this.id, childView]);
  //   this.activeNavigation = activateNavigation;
  // }
}
