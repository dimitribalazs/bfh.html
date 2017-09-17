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

  //todo complete data (tapOrBottled, price)
  addBar(id: string, name: string) {
    const barBeer: BeerBarModel = {
      barId: id,
      barName: name,
      beerId: this.viewModel.id,
      beerName: this.viewModel.name,
      tapOrBottled: true,
      price: "99.9"
    };
    this.businessService.addBeerToBar(barBeer);
  }

  removeBar(id: string) {
    this.businessService.removeBeerFromBar(this.viewModel.id, id);
  }
}
