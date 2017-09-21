/**
 * Created by STRI on 22.08.2017.
 */
import {Injectable} from '@angular/core';
import {BusinessService} from '../shared/services/business.service';
import {BarModel, BeerBarModel, BeerModel} from '../shared/domainModel/viewModels';
import {RatingModel} from '../shared/components/rating/ratingModel';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {GeoData} from '../shared/dto/geoData';
import {AroundYou} from '../shared/dto/aroundYou';
import {isNullOrUndefined} from 'util';
import {Constants} from '../shared/constants';

@Injectable()
export class BarService {

  viewModel: BarModel = new BarModel();
  availableBeerModel:  Subject<Array<AroundYou>> = new BehaviorSubject<Array<AroundYou>>(new Array());
  public targetLocationSubject: Subject<GeoData> = new BehaviorSubject<GeoData>(new GeoData());

  constructor(private businessService: BusinessService) {}

  public getMenuState(): any {
    return {
      titleText: 'Bar info',
      visibleTitle: true,
      visibleHomeLink: true,
      visibleEdit: true
    };
  }

  loadBar(id: string) {
    this.businessService.getBar(id).subscribe((bar: BarModel) => {
      this.viewModel = bar
      bar.beers.subscribe((beers) => {
        if (isNullOrUndefined(beers) || beers.length > 0) {
          const ignorList: Array<AroundYou> = new Array()
          Object.keys(beers).map(value => {
            const model: AroundYou = new AroundYou();
            model.name = beers[value].beerName;
            model.routerNavigate = Constants.ROUTING_PARENT_BEER
            ignorList.push(model)
          })
          this.availableBeerModel.next(ignorList);
        }
      })
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
