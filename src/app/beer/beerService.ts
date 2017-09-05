/**
 * Created by STRI on 22.08.2017.
 */
import { Injectable, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Beer, DropDownEntry} from '../shared/dto/beer';
import {BeerDatabaseService} from '../shared/services/beer.service';
import {BreweryDatabaseService} from "../shared/services/brewery.service";
import {Brewery} from "../shared/dto/brewery";
import {isUndefined} from "util";

@Injectable()
export class BierService {
  beer: Observable<Beer>;
  brewery: Observable<Brewery[]>

  breweryDropDownList: DropDownEntry[] = [];

  viewModel: Beer = new Beer();
  constructor(
    private beerService: BeerDatabaseService<Beer>,
    private breweryService: BreweryDatabaseService<Brewery>
  ) {

  }

  loadBeer(id: string): Observable<Beer>  {
      this.beer = this.beerService.get(id)
      this.beer.subscribe((beer: Beer) => {
        this.viewModel = beer
        if (isUndefined(this.viewModel.brewery)) {
          this.viewModel.brewery = new Brewery();
          this.viewModel.brewery.name = '';
        }
      });
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

  public getBroweryList(): Observable<Brewery[]>  {
    this.brewery = this.breweryService.getAll();
    this.brewery.subscribe((value) => (value.forEach((brewery: Brewery) => {
      console.log(brewery.name)
      const breweryItem: DropDownEntry = new DropDownEntry();
      breweryItem.id = brewery.id
      breweryItem.itemName = brewery.name
      this.breweryDropDownList.push(breweryItem)
    })))
    return this.brewery
  }

  public getDropDownList(): DropDownEntry[] {
    return this.breweryDropDownList;
  }

}
