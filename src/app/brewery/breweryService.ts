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
import {Bar, OpeningHours} from '../shared/dto/bar';
import {BreweryDatabaseService} from "../shared/services/brewery.service";

@Injectable()
export class BreweryService {
  brewery: Observable<Brewery>;
  beer: Observable<Beer[]>



  viewModel: Brewery = new Brewery();
  constructor(
    private beerService: BeerDatabaseService<Beer>,
    private breweryService: BreweryDatabaseService<Brewery>) {

  }


  getAvailableBeers(barId: string): Observable<Beer[]>  {
    this.beer = this.beerService.getAll()
    return this.beer;
  }


  loadBar(id: string): Observable<Brewery>  {
      this.brewery = this.breweryService.get(id)
      this.brewery.subscribe((brewery: Brewery) => {
        this.viewModel = brewery
      });
      return this.brewery;
  }

  getBrewery(): Observable<Brewery>  {
    return this.brewery;
  }

  public getViewModel() {
    return this.viewModel
  }
}
