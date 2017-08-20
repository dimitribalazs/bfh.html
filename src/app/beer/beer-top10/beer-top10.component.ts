import {Component, Input, OnInit} from '@angular/core';
import {Beer} from '../../shared/dto/beer';

@Component({
  selector: 'app-beer-top10',
  templateUrl: './beer-top10.component.html',
  styleUrls: ['./beer-top10.component.css']
})
export class BeerTop10Component implements OnInit {

  @Input() title: String;
  @Input() beers: Beer[];

  constructor() {
  }

  ngOnInit() {
  //   // this can be remove once we have image.
  //   // it is used to select a random image from within our static assets
  //   this.beers.forEach(beer => {
  //     const randomNumber = Math.floor(Math.random() * 4 + 1);
  //     console.log(randomNumber);
  //     beer.randomNumber = randomNumber
  //   });
  }

}
