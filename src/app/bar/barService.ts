/**
 * Created by STRI on 22.08.2017.
 */
import {Injectable} from '@angular/core';
import {BusinessService} from '../shared/services/business.service';
import {BarModel, BeerBarModel} from '../shared/domainModel/viewModels';
import {RatingModel} from '../shared/components/rating/ratingModel';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {GeoData} from '../shared/dto/geoData';

@Injectable()
export class BarService {

  viewModel: BarModel = new BarModel();
  public targetLocationSubject: Subject<GeoData> = new BehaviorSubject<GeoData>(new GeoData());

  constructor(private businessService: BusinessService) {
    // this.viewModel = new BarModel();
    // this.viewModel.openingHours = new OpeningHours();

    // console.log("save bar");
    // var bb = new BarBeer();
    // bb.beer = "1";
    // bb.bar = "2";
    // bb.price = 22.2;
    // bb.tapOrBottled = true;
    // this.barService.addBeerToBar(bb);
    //
    // bb = new BarBeer();
    // bb.beer = "2";
    // bb.bar = "2";
    // bb.price = 11.1;
    // bb.tapOrBottled = false;
    // this.barService.addBeerToBar(bb);
  }

  loadBar(id: string) {
    this.businessService.getBar(id).subscribe((bar: BarModel) => {
      this.viewModel = bar
      this.targetLocationSubject.next(bar.location)
    });
 }

  // set the new user rating
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
    data.barId = this.viewModel.id;
    data.barName = this.viewModel.name;
    this.businessService.addBeerToBar(data);
  }

  removeBar(id: string) {
    this.businessService.removeBeerFromBar(id, this.viewModel.id);
  }
}
