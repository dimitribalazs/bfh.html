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
  viewModel: Beer = new Beer();
  constructor(private beerService: BeerDatabaseService<Beer>) {

  }

  loadBeer(id: string): Observable<Beer>  {
      this.beer = this.beerService.get(id)
      this.beer.subscribe((beer: Beer) => this.viewModel = beer);
      return this.beer;
  }

  getBeer(): Observable<Beer>  {
    return this.beer;
  }

  submit() {
    this.beerService.update(this.viewModel.id, this.viewModel);
  }

  public getViewModel() {
    return this.viewModel
  }
}
