/**
 * Created by STRI on 22.08.2017.
 */
import { Injectable } from '@angular/core';
import {BusinessService} from '../shared/services/business.service';
import {BreweryModel} from '../shared/domainModel/viewModels';

@Injectable()
export class BreweryService {

  viewModel: BreweryModel = new BreweryModel();

  constructor(private businessService: BusinessService) {}


  loadBrewery(id: string) {
    this.businessService.getBrewery(id).subscribe((brewery: BreweryModel) => this.viewModel = brewery);
  }
}
