import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {AroundYou} from '../../../dto/aroundYou';
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

  @Input() items: Observable<BeerBarModel>;
  @Input() filter: number;
  @Output() onAdd = new EventEmitter<AroundYou>()
  @Output() onRemove = new EventEmitter<string>()
  @Output() onCancel = new EventEmitter()


  search: boolean;
  searchSubject: Subject<String> = new BehaviorSubject<string>('');
  filterSubject: Subject<number> = new BehaviorSubject<number>(1);
  menuState

  constructor(private menuService: MenuService,
              private router: Router) {
    this.search = false;
    this.menuState = menuService.state
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

  onCreateBeer(data: AroundYou) {
    this.router.navigate(['beer/new', {name: data}]);
  }

  onResult(data: AroundYou) {
    this.search = false;
    this.menuService.setNewState(this.menuState)
    this.onAdd.emit(data);
  }

  onBarShow(id: string) {
    this.router.navigate(['bar', id]);
  }

  onBeerShow(id: string) {
    this.router.navigate(['beer', id]);
  }

  onRemoveItem(id: string) {
    this.menuService.setNewState(this.menuState)
    this.onRemove.emit(id);
  }


}
