import { Injectable, OnInit } from '@angular/core';
import {BeerModel, DropDownEntry, BeerBarModel} from '../shared/domainModel/viewModels';
import {BusinessService} from '../shared/services/business.service';
import {RatingModel} from '../shared/components/rating/ratingModel';
import {MenuState} from "../shared/services/menu.service";
import {BarBeer} from "../shared/dto/barBeer";

@Injectable()
export class BeerService {

  breweryDropDownList: DropDownEntry[] = [];

  public viewModel: BeerModel = new BeerModel();
  constructor(private businessService: BusinessService) {}

  loadBeer(id: string) {
    this.businessService.getBeer(id).subscribe((beer: BeerModel) => this.viewModel = beer);
  }

  submit() {
      this.viewModel.id = this.businessService.createOrUpdateBeer(this.viewModel)
  }

  createNewBeer(name: string) {
    this.viewModel = new BeerModel()
    this.viewModel.name = name;
  }

  public getDropDownList(): DropDownEntry[] {
    return this.breweryDropDownList;
  }


  /**
   * set the new user rating
   * @param rating
   */
  setUserRating(rating: RatingModel) {
    this.viewModel.ratings[rating.oldRating] >= 0 ?
      this.viewModel.ratings[rating.oldRating] = 0 :
      this.viewModel.ratings[rating.oldRating] -= 1;

    this.viewModel.ratings[rating.newRating] += 1;
    this.viewModel.userRating = rating.newRating;
    this.businessService.setBarRating(this.viewModel.ratings[0], this.viewModel.ratings[1],
      this.viewModel.ratings[2], this.viewModel.userRating)
  }

  /**
   * add a Beer to a bar with prise and serving
   * @param data
   */
  addBar(data: BeerBarModel) {
    data.barId = data.beerId;
    data.barName = data.beerName;
    data.beerId = this.viewModel.id;
    data.beerName = this.viewModel.name
    this.businessService.addBeerToBar(data);
  }

  removeBar(id: string) {
    this.businessService.removeBeerFromBar(this.viewModel.id, id);
  }
}
