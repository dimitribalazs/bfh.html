import {Component, Input, OnInit} from '@angular/core';
import {Beer} from '../../shared/dto/beer';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {isUndefined} from 'util';

const SINGLE_IMAGE_WIDTH = 60;
const SINGLE_SPAN_WIDTH = 64;

@Component({
  selector: 'app-beer-top10',
  templateUrl: './beer-top10.component.html',
  styleUrls: ['./beer-top10.component.css']
})


export class BeerTop10Component implements OnInit {

  @Input() title: String;
  @Input() beers: Observable<Beer>;

  public width: string;
  public singleElementWidth = SINGLE_IMAGE_WIDTH + 'px';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.beers.subscribe(
      (beer: Beer) => {
        let beerCount = 0;
        for (let i = 0; ; i++) {
          if (isUndefined(beer[i])) {
            break;
          }

          beerCount++;
        }

        this.width = (beerCount * SINGLE_SPAN_WIDTH) + 'px';
      }
    );
  }

  onOpen(beer: Beer) {
    this.router.navigate(['beer', beer.id]);
  }
}
