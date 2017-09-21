import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {AroundYou} from '../../../dto/AroundYou';
import {MenuService, MenuState} from '../../../services/menu.service';
import {Router} from '@angular/router';
import {MultiNavigationModel} from '../../../domainModel/multiNavigationModel';
import {Observable} from 'rxjs/Observable';
import {BeerBarModel} from "../../../domainModel/viewModels";

@Component({
  selector: 'app-available-data',
  templateUrl: './available-data.component.html',
  styleUrls: ['./available-data.component.css']
})
export class AvailableDataComponent implements OnInit {

  @Input() items: Observable<any>;
  @Input() filter: number;
  @Input() dataIsBeerModel: boolean;
  @Input() itemAddDisable: boolean;
  @Input() searchIgnorList: Observable<Array<AroundYou>>;
  @Output() onAdd = new EventEmitter<BeerBarModel>()
  @Output() onRemove = new EventEmitter<string>()
  @Output() onCancel = new EventEmitter()
  @Output() onCheers = new EventEmitter<string>()


  search: boolean;
  searchSubject: Subject<String> = new BehaviorSubject<string>('');
  filterSubject: Subject<number> = new BehaviorSubject<number>(1);
  menuState
  linkInformation: boolean
  linkModel: BeerBarModel;

  constructor(private menuService: MenuService,
              private router: Router) {
    this.search = false;
    this.linkInformation = false;
    this.menuState = menuService.state
    this.linkModel = new BeerBarModel();
  }

  ngOnInit() {
    this.filterSubject.next(this.filter);
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
    this.linkModel.tapOrBottled = data.tapOrBottled;
    this.linkInformation = true;
  }

  OnChangePriceFromBeer(data: BeerBarModel) {
    this.linkModel.beerId = data.beerId;
    this.linkModel.beerName = data.beerName;
    this.linkModel.price = data.price;
    this.linkModel.tapOrBottled = data.tapOrBottled;
    this.linkInformation = true;
  }

  onCreateBeer(data: AroundYou) {
    this.router.navigate(['beer/new', {name: data}]);
  }

  onResult(data: AroundYou) {
    this.search = false;
    this.linkModel.beerId = data.id;
    this.linkModel.beerName = data.name;
    if (this.dataIsBeerModel) {
      this.OnAddPrice(this.linkModel);
    }else {
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


  cheers(beerId: string) {
    this.menuService.setNewState(this.menuState)
    this.onCheers.emit(beerId);
  }

  onRemoveItem(id: string) {
    this.menuService.setNewState(this.menuState)
    this.onRemove.emit(id);
  }


}
