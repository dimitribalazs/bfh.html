import { Component, OnInit } from '@angular/core';
import {Beer} from '../shared/dto/beer';
import {BeerDatabaseService} from '../shared/services/beer.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BierService} from './beerService'
import {MenuService} from "../shared/services/menu.service";
import {RatingModel} from "./ratingModel";

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.css'],
})
export class BeerComponent implements OnInit {

  id: string;
  model: Beer = new Beer;
  menu: MenuService;
  ratings: number[] = new Array;
  counterRatingBad: number;
  counterRatingOk: number;
  counterRatingGreat: number;
  meRating: number;

  constructor(private beerService: BierService,
              private route: ActivatedRoute,
              private router: Router,
              private menuService: MenuService) {
      this.menu = menuService;
      this.menu.TitleText = 'Beer info';
      this.menu.visibleHomeLink = true;
      this.menu.visibleSearchLink = false;
      this.menu.visibleTitle = true;
      this.menu.visibleSearchInput = false;
      this.menu.visibleEdit = true;
  }



  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Load beer:' + params['id']);
      this.id = params['id'];
      this.beerService.loadBeer(params['id']);
    });

    this.beerService.getBeer().subscribe((beer) => {
      this.model = this.beerService.getViewModel();
      console.log('Routing Mode', beer.name)})

      this.ratings[1] = 12;
      this.ratings[2] = 54;
      this.ratings[3] = 4;
      this.meRating = 1
    }

  onClick(childView: string) {
    this.router.navigate(['beer', this.id, childView]);
  }

  onRatingChange(rating: RatingModel) {
    this.ratings[rating.oldRating] -= 1;
    this.ratings[rating.newRating] += 1;
  }

}
