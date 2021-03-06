import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {MenuService} from '../../../services/menu.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MultiNavigationModel} from '../../../domainModel/multiNavigationModel';
import {Observable} from 'rxjs/Observable';
import {BeerBarModel} from '../../../domainModel/viewModels';
import {BreweryService} from '../../../../brewery/breweryService';
import {ServingStyle} from '../../../dto/barBeer';

@Component({
  selector: 'app-available-data',
  templateUrl: './available-data.component.html',
  styleUrls: ['./available-data.component.css']
})
/**
 * Displays which beer is available in a given bar and vice versa.
 * This class hold a series of callback methods that are called whenever an event data on this page changes.
 * It is also state aware in terms of on which page (beer, bar or brewery) this component is used.
 */
export class AvailableDataComponent implements OnInit {
  @Input() items: Observable<any>;
  @Input() filter: number;
  @Input() dataIsBeerModel: boolean;
  @Input() itemAddDisable: boolean;
  @Input() searchIgnorList: Observable<Array<MultiNavigationModel>>;
  @Output() onAdd = new EventEmitter<BeerBarModel>()
  @Output() onRemove = new EventEmitter<string>()
  @Output() onCancel = new EventEmitter()
  @Output() onCheers = new EventEmitter<{ beerId: string, beerName: string }>()

  search: boolean;
  searchSubject: Subject<String> = new BehaviorSubject<string>('');
  filterSubject: Subject<number> = new BehaviorSubject<number>(1);
  menuState
  linkInformation: boolean
  linkModel: BeerBarModel;
  servingStyle = ServingStyle;

  private id: string;

  constructor(private menuService: MenuService,
              private router: Router,
              private brewreyService: BreweryService,
              private route: ActivatedRoute) {
    this.search = false;
    this.linkInformation = false;
    this.menuState = menuService.state
    this.linkModel = new BeerBarModel();
  }

  ngOnInit() {
    this.filterSubject.next(this.filter);
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  onAddItem() {
    if (this.search) {
      this.search = false;
      this.menuService.setNewState(this.menuState)
      this.onCancel.emit();
    } else {
      this.search = true;
      this.menuService.setNewState({
        visibleSearchInput: true,
        visibleBack: true,
        visibleTitle: false,
        onInput: (e: string) => {
          this.searchSubject.next(e)
        }
      })
    }
  }

  OnChangePriceFromBar(data: BeerBarModel) {
    this.linkModel.beerId = data.barId;
    this.linkModel.beerName = data.barName
    this.linkModel.price = data.price;
    this.linkModel.servingStyle = data.servingStyle;
    this.linkInformation = true;
  }

  OnChangePriceFromBeer(data: BeerBarModel) {
    this.linkModel.beerId = data.beerId;
    this.linkModel.beerName = data.beerName;
    this.linkModel.price = data.price;
    this.linkModel.servingStyle = data.servingStyle;
    this.linkInformation = true;
  }

  onCreateBeer(data: MultiNavigationModel) {
    this.router.navigate(['beer/new', {name: data}]);
  }

  onResult(data: MultiNavigationModel) {
    this.search = false;
    this.linkModel.beerId = data.id;
    this.linkModel.beerName = data.name;
    if (this.dataIsBeerModel) {
      this.OnAddPrice(this.linkModel);
    } else {
      this.linkInformation = true;
    }
  }

  OnAddPrice(data: BeerBarModel) {
    this.search = false;
    this.linkInformation = false;
    this.menuService.setNewState(this.menuState)
    this.onAdd.emit(data);
  }

  onBarShow(id: string) {
    this.router.navigate(['bar', id]);
  }

  onBeerShow(id: string) {
    this.router.navigate(['beer', id]);
  }

  cheers(beerId: string, beerName: string) {
    this.menuService.setNewState(this.menuState)
    this.onCheers.emit({beerId: beerId, beerName: beerName});
  }

  onRemoveItem(id: string) {
    this.menuService.setNewState(this.menuState)
    this.onRemove.emit(id);
  }

  addCheers(beerIdAndName) {
    this.brewreyService.addBeerDrank(beerIdAndName);
    this.menuService.setNewState({
      titleText: 'KEEP CALM AND SAY CHEERS',
      visibleTitle: true,
      visibleBack: false,
      visibleHomeLink: true,
      visibleEdit: false
    });

    setTimeout(() => {
      this.menuService.setNewState(this.brewreyService.getMenuState());
    }, 2500);
  }

  onMapClick(childView: string, activateNavigation: number) {
    this.router.navigate(['beer', this.id, childView]);
  }
}
