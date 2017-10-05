import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RatingModel} from './ratingModel';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
/**
 * Displays rating buttons on bars and beers.
 *
 * Changes are delegated to [[RatingModel]]
 */
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
    this.onRatingChange.emit(this.ratingModel);
    this.ratingModel.oldRating = this.ratingModel.newRating;
  }
}
