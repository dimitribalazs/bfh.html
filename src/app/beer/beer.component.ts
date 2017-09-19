import {Component, OnInit} from '@angular/core';
import {Beer} from '../shared/dto/beer';
import {Brewery} from '../shared/dto/brewery';
import {BeerDatabaseService} from '../shared/services/beer.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BeerService} from './beerService'
import {MenuService} from '../shared/services/menu.service';
import {RatingModel} from '../shared/components/rating/ratingModel';
import {isUndefined} from "util";


@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.css'],
})
export class BeerComponent implements OnInit {

  id: string;
  edit: boolean;
  new: boolean;
  imageUploadShow: boolean = false;
  activeNavigation: number;

  constructor(private beerService: BeerService,
              private route: ActivatedRoute,
              private router: Router,
              private menuService: MenuService) {
    this.menuService.setNewState({
      titleText: 'Beer info',
      visibleBack: true,
      visibleHomeLink: true,
      visibleEdit: true
    });
    this.activeNavigation = 0;
  }


  ngOnInit() {
    const type: string = this.route.snapshot.data['type'];
    const child: String = this.route.snapshot.firstChild.firstChild.url.toString();

    if (child === 'info') {
      this.activeNavigation = 0;
    } else if (child === 'brewery') {
      this.activeNavigation = 1;
    } else if (child === 'bars') {
      this.activeNavigation = 2;
    }

    if (type === 'edit') {
      this.edit = true;
      this.new = false;
    } else if (type === 'new') {
      this.edit = true;
      this.new = true;
    } else {
      this.edit = false;
      this.new = false;
    }

    if (this.new) {
      const name: string = this.route.snapshot.data['name'];
      this.route.params.subscribe(params => {
        this.beerService.createNewBeer(params['name'])
      });


    } else {
      this.route.params.subscribe(params => {
        // console.log('Load beer:' + params['id']);
        this.id = params['id'];
        this.beerService.loadBeer(this.id);

      });
    }


  }

  onClick(childView: string, activateNavigation: number) {
    this.router.navigate(['beer', this.id, childView]);
    this.activeNavigation = activateNavigation;
  }

  onRatingChange(rating: RatingModel) {
    this.beerService.setUserRating(rating);
  }

  onImageEdit() {
    // this.menuService.visibleEdit = false;
    this.imageUploadShow = true;
  }
}
