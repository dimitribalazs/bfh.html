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

  public viewModel: Beer = new Beer();
  constructor(
    private beerService: BeerDatabaseService<Beer>,
    private breweryService: BreweryDatabaseService<Brewery>
  ) {

    /*
    const beer = new Beer();
    beer.name = "Pissebier";
    beer.volume = 22;
    const brewery = new Brewery();
    brewery.name = "Iii";
    beer.brewery = brewery;
    this.beerService.create(beer); */

    this.beerService.getAllBeersByBreweryId(1).subscribe((data) => console.log("foo ", data));
  }

  loadBeer(id: string): Observable<Beer>  {
      this.beer = this.beerService.get(id)
      this.beer.subscribe((beer: Beer) => {
        this.viewModel = beer
        if (isUndefined(this.viewModel.brewery)) {
          //this.viewModel.brewery = new Brewery();
          //this.viewModel.brewery.name = '';
        }
      });
      return this.beer;
  }

  getBeer(): Observable<Beer>  {
    return this.beer;
  }

  submit() {
    if (isUndefined(this.viewModel.id)) {
      this.viewModel.id = this.beerService.create(this.viewModel)
    } else {
      this.beerService.update(this.viewModel.id, this.viewModel);
    }
  }

  public getViewModel() {
    return this.viewModel
  }

  public setViewModel(beer: Beer) {
    this.viewModel = beer;
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
