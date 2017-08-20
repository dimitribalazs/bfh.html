import {Component, Input, OnInit} from '@angular/core';
import {Beer} from '../../shared/dto/beer';
import {Observable} from 'rxjs/Observable';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-beer-top10',
  templateUrl: './beer-top10.component.html',
  styleUrls: ['./beer-top10.component.css']
})
export class BeerTop10Component implements OnInit {

  @Input() title: String;
  @Input() beers: Observable<Beer>;

  constructor() {
  }

  ngOnInit() {
  }

  getImageUrl(): String {
    return '../../assets/logos/logo-' + Math.floor(Math.random() * 14 + 1).toString() + '.jpg';
  }

}
