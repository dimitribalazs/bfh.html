/**
 * Created by STRI on 22.08.2017.
 */
import { Injectable, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Beer, DropDownEntry} from '../shared/dto/beer';
import {BeerDatabaseService} from '../shared/services/beer.service';
import {BarDatabaseService} from '../shared/services/bar.service';
import {Bar, OpeningHours} from '../shared/dto/bar';
import {BarBeer} from '../shared/dto/barBeer';

@Injectable()
export class BarService {
  bar: Observable<Bar>;
  beer: Observable<Beer[]>



  viewModel: Bar = new Bar();
  constructor(
    private beerService: BeerDatabaseService<Beer>,
    private barService: BarDatabaseService<Bar>,
  ) {
    this.viewModel = new Bar();
    this.viewModel.openingHours = new OpeningHours();

    console.log("save bar");
    var bb = new BarBeer();
    bb.beer = "1";
    bb.bar = "2";
    bb.price = 22.2;
    bb.tapOrBottled = true;
    this.barService.addBeerToBar(bb);

    bb = new BarBeer();
    bb.beer = "2";
    bb.bar = "2";
    bb.price = 11.1;
    bb.tapOrBottled = false;
    this.barService.addBeerToBar(bb);
  }


  getAvailableBeers(barId: string): Observable<Beer[]>  {
    this.beer = this.beerService.getAll()
    return this.beer;
  }


  loadBar(id: string): Observable<Bar>  {
      this.bar = this.barService.get(id)
      this.bar.subscribe((bar: Bar) => {
        this.viewModel = bar
      });
      return this.bar;
  }

  getBar(): Observable<Bar>  {
    return this.bar;
  }

  public getViewModel() {
    return this.viewModel
  }
}
