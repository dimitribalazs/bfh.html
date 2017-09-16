/**
 * Created by STRI on 22.08.2017.
 */
import { Injectable, OnInit } from '@angular/core';
import {BeerModel, DropDownEntry} from '../shared/domainModel/viewModels';
import {BusinessService} from '../shared/services/business.service';
import {RatingModel} from '../shared/components/rating/ratingModel';

@Injectable()
export class BierService {

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

}
