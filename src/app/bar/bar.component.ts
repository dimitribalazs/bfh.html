import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {Bar} from '../shared/dto/bar';
import {RatingModel} from '../shared/components/rating/ratingModel';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MenuService} from '../shared/services/menu.service';
import {BarService} from './barService';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit {

  id: string;
  // model: Bar = new Bar;
  ratings: number[] = new Array;
  meRating: number;


  constructor(private barService: BarService,
              private route: ActivatedRoute,
              private router: Router,
              private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.setNewState({
      titleText: 'Bar info',
      visibleHomeLink: true
    });

    this.route.params.subscribe(params => {
      // console.log('Load bar:' + params['id']);
      this.id = params['id'];
      this.barService.loadBar(params['id']);
    });

    // this.barService.getBar().subscribe((beer) => {
    //   this.model = this.barService.getViewModel();
    // })

    this.ratings[1] = 11;
    this.ratings[2] = 20;
    this.ratings[3] = 4;
    this.meRating = 1
    // console.log(this.route.snapshot.toString())
  }

  onClick(childView: string) {
    this.router.navigate(['bar', this.id, childView]);
  }

  onRatingChange(rating: RatingModel) {
    this.ratings[rating.oldRating] -= 1;
    this.ratings[rating.newRating] += 1;
  }
}
