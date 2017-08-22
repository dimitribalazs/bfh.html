/**
 * Created by STRI on 22.08.2017.
 */
import { Injectable, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Beer} from '../shared/dto/beer';
import {BeerDatabaseService} from '../shared/services/beer.service';

@Injectable()
export class BierService {
  beer: Observable<Beer>
  ViewModel: Beer = new Beer();
  constructor(private beerService: BeerDatabaseService<Beer>) {

  }

  loadBeer(id: string): Observable<Beer>  {
      this.beer = this.beerService.get(id)
      this.beer.subscribe((beer: Beer) => this.ViewModel = beer);
      return this.beer;
  }

  getBeer(): Observable<Beer>  {
    return this.beer;
  }
  saveBeer(beer: Beer) {
    this.beerService.update(beer.id, beer);
  }

  public getViewModel() {
    return this.ViewModel
  }
}
