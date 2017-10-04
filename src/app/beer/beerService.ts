import {Injectable} from '@angular/core';
import {BeerBarModel, BeerModel, DropDownEntry} from '../shared/domainModel/viewModels';
import {BusinessService} from '../shared/services/business.service';
import {RatingModel} from '../shared/components/rating/ratingModel';
import {MenuService} from '../shared/services/menu.service';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {isNullOrUndefined} from 'util';
import {Constants} from '../shared/constants';
import {MultiNavigationModel} from '../shared/domainModel/multiNavigationModel';

@Injectable()
export class BeerService {

  breweryDropDownList: DropDownEntry[] = [];
  editForbidden: boolean
  public viewModel: BeerModel = new BeerModel();
  availableBarModel: Subject<Array<MultiNavigationModel>> = new BehaviorSubject<Array<MultiNavigationModel>>(new Array());

  constructor(private businessService: BusinessService,
              private menuService: MenuService) {
  }

  loadBeer(id: string) {
    this.businessService.getBeer(id).subscribe((beer: BeerModel) => {
      this.viewModel = beer
      this.editForbidden = !this.businessService.canBeerEdit(beer)
      beer.bars.subscribe((bars) => {
        if (isNullOrUndefined(bars) || bars.length > 0) {
          const ignorList: Array<MultiNavigationModel> = new Array()
          Object.keys(bars).map(value => {
            const model: MultiNavigationModel = new MultiNavigationModel();
            model.name = bars[value].barName;
            model.routerNavigate = Constants.ROUTING_PARENT_BAR
            ignorList.push(model)
          })
          this.availableBarModel.next(ignorList);
        }
      })
    });
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

  public addBeerDrank() {
    this.businessService.addBeerDrank(this.viewModel.id, this.viewModel.name);
  }

  public getMenuState(): any {
    return {
      titleText: 'Beer info',
      visibleTitle: true,
      visibleBack: true,
      visibleHomeLink: true,
      visibleEdit: true
    };
  }

  /**
   * set the new user rating
   * @param rating
   */
  setUserRating(rating: RatingModel) {
    this.businessService.setBeerRating(this.viewModel.id, rating.newRating)
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
