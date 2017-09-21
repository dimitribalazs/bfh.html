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

  public getMenuState(): any {
    return {
      titleText: 'Bar info',
      visibleTitle: true,
      visibleHomeLink: true,
    };
  }

  loadBar(id: string) {
    this.businessService.getBar(id).subscribe((bar: BarModel) => {
      this.viewModel = bar
      this.targetLocationSubject.next(bar.location)
    });
 }

  public addBeerDrank(beerId: string) {
    this.businessService.addBeerDrank(this.viewModel.id);
  }

  public addBarVisited() {
    this.businessService.addBarVisited(this.viewModel.id);
  }

  // set the new user rating
  setUserRating(rating: RatingModel) {
    this.businessService.setBarRating(this.viewModel.id, rating.newRating)
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
