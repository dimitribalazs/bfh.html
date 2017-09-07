import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {Bar} from '../shared/dto/Bar';
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
  model: Bar = new Bar;
  ratings: number[] = new Array;
  meRating: number;
  imageUploadShow: boolean = false;


  constructor(private barService: BarService,
              private route: ActivatedRoute,
              private router: Router,
              private menuService: MenuService) {
    this.menuService.setDefault();
    this.menuService.TitleText = 'Bar info';
    this.menuService.visibleHomeLink = true;
    this.menuService.visibleTitle = true;
    this.menuService.visibleEdit = true;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      console.log('Load bar:' + params['id']);
      this.id = params['id'];
      this.barService.loadBar(params['id']);
    });

    this.barService.getBar().subscribe((beer) => {
      this.model = this.barService.getViewModel();
    })

    this.ratings[1] = 12;
    this.ratings[2] = 54;
    this.ratings[3] = 4;
    this.meRating = 1
    console.log(this.route.snapshot.toString())
  }

  onClick(childView: string) {
    this.router.navigate(['bar', this.id, childView]);
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
