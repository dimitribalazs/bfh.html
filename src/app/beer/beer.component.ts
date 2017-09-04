import { Component, OnInit } from '@angular/core';
import {Beer} from '../shared/dto/beer';
import {BeerDatabaseService} from '../shared/services/beer.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BierService} from './beerService'
import {MenuService} from '../shared/services/menu.service';
import {RatingModel} from './ratingModel';
import {isUndefined} from "util";


@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.css'],
})
export class BeerComponent implements OnInit {

  id: string;
  model: Beer = new Beer;
  ratings: number[] = new Array;
  meRating: number;
  edit: boolean;
  imageUploadShow: boolean = false;

  constructor(private beerService: BierService,
              private route: ActivatedRoute,
              private router: Router,
              private menuService: MenuService) {
      this.menuService.setDefault();
      this.menuService.TitleText = 'Beer info';
      this.menuService.visibleHomeLink = true;
      this.menuService.visibleTitle = true;
      this.menuService.visibleEdit = true;
  }


  ngOnInit() {
    const type: string = this.route.snapshot.data['type'];

    if (type === 'edit') {
      this.edit = true;
    }else {
      this.edit = false;
    }

    this.route.params.subscribe(params => {
      console.log('Load beer:' + params['id']);
      this.id = params['id'];
      this.beerService.loadBeer(params['id']);
    });

    this.beerService.getBeer().subscribe((beer) => {
      this.model = this.beerService.getViewModel();

      if (isUndefined(this.model.taste)) {
        this.model.taste = [];
      }
      if (isUndefined(this.model.brewType)) {
        this.model.brewType = [];
      }
      console.log('Routing Mode', beer.name)})

      this.ratings[1] = 12;
      this.ratings[2] = 54;
      this.ratings[3] = 4;
      this.meRating = 1
    console.log(this.route.snapshot.toString())
    }

  onClick(childView: string) {
    this.router.navigate(['beer', this.id, childView]);
  }

  onRatingChange(rating: RatingModel) {
    this.ratings[rating.oldRating] -= 1;
    this.ratings[rating.newRating] += 1;
  }


  onImageEdit() {
    this.menuService.visibleEdit = false;
    this.imageUploadShow = true;
  }
}
