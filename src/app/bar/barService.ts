/**
 * Created by STRI on 22.08.2017.
 */
import { Injectable, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Beer, DropDownEntry} from '../shared/dto/beer';
import {BeerDatabaseService} from '../shared/services/beer.service';
import {Brewery} from '../shared/dto/brewery';
import {isUndefined} from 'util';
import {BarDatabaseService} from '../shared/services/bar.service';
import {Bar} from '../shared/dto/Bar';

@Injectable()
export class BarService {
  bar: Observable<Bar>;
  // beer: Observable<Beer[]>



  viewModel: Bar = new Bar();
  constructor(
    // private beerService: BeerDatabaseService<Beer>,
    private barService: BarDatabaseService<Bar>,
  ) {

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
