import { Component, Input, OnInit } from '@angular/core';
import { Beer } from '../../shared/dto/beer';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { isUndefined } from 'util';

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
        // Now, this is just random....
        // Beer is kind of an array. or a Beer instance. Or a mix of both.
        // You get all the Beer properties, but have to use them like beer[0].name
        // So, one would use beer.length to get how many beers there are. Easy.
        // Using length property will not compile, though, because it does not exist on type Beer :-P
        //
        // This, dear Mr. Bandi, is why you are presented with this beautiful hack:
        let beerCount = 0;
        for (let i = 0; ; i++) {
          if (isUndefined(beer[i])) {
            break;
          }

          beerCount++;
        }
        //this is used to calculate the horizontal scroller width on the main page.
        this.width = (beerCount * SINGLE_SPAN_WIDTH) + 'px';
      }
    );
  }

  onOpen(beer: Beer) {
    this.router.navigate(['beer', beer.id]);
  }
}
