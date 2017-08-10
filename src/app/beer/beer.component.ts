import { Component, OnInit } from '@angular/core';
import {Beer} from './Beer';
import {BeerService} from './beer.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.css'],
  providers: [BeerService]
})
export class BeerComponent implements OnInit {

  title = 'Tour of Beer';
  beers: Observable<Beer[]>;

  private selectedId: number;

  constructor(private beerService: BeerService,
              private route: ActivatedRoute,
              private router: Router) { }



  ngOnInit() {
    this.beers = this.route.paramMap
      .switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.beerService.getBeers();
      });
  }

  isSelected(beer: Beer) { return beer.id === this.selectedId; }

  onSelect(hero: Beer) {
    this.router.navigate(['/bar', hero.id]);
  }
}
