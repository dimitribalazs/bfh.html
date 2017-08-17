import { Component, OnInit } from '@angular/core';
import {Beer} from '../dto/beer';
import {BeerDatabaseService} from '../database.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.css'],
  providers: [BeerDatabaseService]
})
export class BeerComponent implements OnInit {

  title = 'Tour of Beer';
  beers: Observable<Beer[]>;

  private selectedId: number;

  constructor(private beerService: BeerDatabaseService<Beer>,
              private route: ActivatedRoute,
              private router: Router) { }



  ngOnInit() {
    // this.beers = this.route.paramMap
    //   .switchMap((params: ParamMap) => {
    //     // (+) before `params.get()` turns the string into a number
    //     this.selectedId = +params.get('id');
    //     return this.beerService.getBeers();
    //   });

    // return this.beerService.getAll();
  }

  // isSelected(beer: Beer) { return beer.id === this.selectedId; }

  onSelect(hero: Beer) {
    this.router.navigate(['/bar', hero.id]);
  }
}
