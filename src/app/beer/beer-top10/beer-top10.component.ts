import {Component, Input, OnInit} from '@angular/core';
import {Beer} from '../../shared/dto/beer';
import {Observable} from 'rxjs/Observable';
import {logger} from 'codelyzer/util/logger';
import {Router} from '@angular/router';

@Component({
  selector: 'app-beer-top10',
  templateUrl: './beer-top10.component.html',
  styleUrls: ['./beer-top10.component.css']
})
export class BeerTop10Component implements OnInit {

  @Input() title: String;
  @Input() beers: Observable<Beer>;


  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.beers);
  }

  onSelect(beer: Beer) {
    this.router.navigate(['beer', beer.id]);
  }
}
