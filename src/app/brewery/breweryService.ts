/**
 * Created by STRI on 22.08.2017.
 */
import { Injectable } from '@angular/core';
import {BusinessService} from '../shared/services/business.service';
import {BeerBarModel, BreweryModel} from '../shared/domainModel/viewModels';
import {AroundYou} from "../shared/dto/aroundYou";

@Injectable()
export class BreweryService {

  viewModel: BreweryModel = new BreweryModel();

  constructor(private businessService: BusinessService) {}


  loadBrewery(id: string) {
    this.businessService.getBrewery(id).subscribe((brewery: BreweryModel) => this.viewModel = brewery);
  }

  addBeer(data: BeerBarModel) {
    this.businessService.addBeerToBrewery(data.beerId, data.beerName, this.viewModel.id, this.viewModel.name)
  }
  removeBeer(id: string) {
    this.businessService.removeBeerFromBrewery(id, this.viewModel.id)
  }
}
