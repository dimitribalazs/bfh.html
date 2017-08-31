import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {RatingModel} from '../ratingModel';

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


  constructor() { }

  ngOnInit() {
    this.ratingModel.oldRating = this.rating;
  }

  onChange(e) {
    this.ratingModel.newRating = e;
    this.onRatingChange.emit(this.ratingModel);
    this.ratingModel.oldRating = e;
  }
}
