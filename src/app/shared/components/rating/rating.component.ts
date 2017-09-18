import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {RatingModel} from './ratingModel';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-beer-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() ratingBad: number;
  @Input() ratingOk: number;
  @Input() ratingGreat: number;
  @Input() rating: number;
  @Output() onRatingChange = new EventEmitter<RatingModel>()
  ratingModel = new RatingModel();
  activeRating: boolean[] = new Array;

  constructor() {
    this.activeRating[0] = false;
    this.activeRating[1] = false;
    this.activeRating[2] = false;
  }

  ngOnInit() {
    this.ratingModel.oldRating = this.rating;
    // this.setButtonActiv(this.rating)
  }

  onChange(e) {
    this.ratingModel.newRating = e - 1;
    // this.setButtonActiv(e)
    this.onRatingChange.emit(this.ratingModel);
    this.ratingModel.oldRating = this.ratingModel.newRating;
  }

  // setButtonActiv(activeIndex: number): void {
  //   for (let _i = 0; _i <  this.activeRating.length; _i++) {
  //     if (_i === (activeIndex - 1)) {
  //       this.activeRating[_i] = true;
  //     } else {
  //       this.activeRating[_i] = false;
  //     }
  //   }
  // }
}
export class BeerRating extends RatingComponent {}
export class BarRating extends RatingComponent {}
