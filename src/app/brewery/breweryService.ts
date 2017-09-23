/**
 * Created by STRI on 22.08.2017.
 */
import { Injectable } from '@angular/core';
import {BusinessService} from '../shared/services/business.service';
import {BeerBarModel, BreweryModel} from '../shared/domainModel/viewModels';

@Injectable()
export class BreweryService {

  viewModel: BreweryModel = new BreweryModel();

  constructor(private businessService: BusinessService) {}

  public getMenuState(): any {
    return {
      titleText: 'Brewery info',
      visibleTitle: true,
      visibleBack: true,
      visibleHomeLink: true,
      visibleEdit: true
    };
  }

  loadBrewery(id: string) {
    this.businessService.getBrewery(id).subscribe((brewery: BreweryModel) => this.viewModel = brewery);
  }

  addBeer(data: BeerBarModel) {
    this.businessService.addBreweryToBeer(data.beerId, this.viewModel.id);
  }
  removeBeer(id: string) {
    this.businessService.removeBreweryFromBeer(id)
  }

  public addBeerDrank(beerId: string) {
    this.businessService.addBeerDrank(beerId);
  }
}
