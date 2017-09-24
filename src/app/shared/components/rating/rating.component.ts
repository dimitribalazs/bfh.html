import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {RatingModel} from './ratingModel';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-rating',
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
  }

  ngOnInit() {
    this.ratingModel.oldRating = this.rating;
  }

  onChange(e) {
    this.ratingModel.newRating = e - 1;
    // this.setButtonActiv(e)
    this.onRatingChange.emit(this.ratingModel);
    this.ratingModel.oldRating = this.ratingModel.newRating;
  }
}
