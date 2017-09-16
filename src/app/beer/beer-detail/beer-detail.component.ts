import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {DropDownEntry, DropDownlists} from '../../shared/domainModel/viewModels';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {BeerService} from '../beerService'
import {MenuService, MenuState} from '../../shared/services/menu.service';
import {isUndefined} from 'util';
import {BehaviorSubject} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {AroundYou} from '../../shared/dto/aroundYou';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['../beer.component.css']
})
export class BeerDetailComponent implements OnInit {

  // model: Beer = new Beer;
  public submitted: boolean = false;
  public formErrorMessage: boolean = false;
  dropDownlists = new DropDownlists()
  breweryDropDownList: DropDownEntry[];
  brewerySelectedItem: DropDownEntry[] = new Array;

  searchBrewery: boolean

  searchSubject: Subject<String> = new BehaviorSubject<String>('');
  filterSubject: Subject<number> = new BehaviorSubject<number>(2);


  constructor(private beerService: BeerService,
              private menuService: MenuService,
              private router: Router) {
    this.searchBrewery = false;
  }


  ngOnInit() {
    this.setMenu()
  }

  setMenu() {
    this.menuService.setNewState({
      titleText: 'Enter or edit beer info',
      visibleSave: true,
      visibleBack: true,
      visibleHomeLink: true,
      visibleTitle: true,
      onInput: (e: string) => {
        this.searchSubject.next(e)
      },
      onSubmit: () => {
        if (isUndefined(this.beerService.viewModel.name) || this.beerService.viewModel.name.length === 0 ||
          isUndefined(this.beerService.viewModel.description) || this.beerService.viewModel.description.length === 0) {
          this.formErrorMessage = true;
        } else {
          this.beerService.submit();
          this.submitted = true;
          this.formErrorMessage = false;
          this.router.navigate(['beer/', this.beerService.viewModel.id]);
        }
      }
    });
  }
  onTasteSelectChange(item: any[]) {
    this.beerService.viewModel.taste = item;
  }

  onBrewTypeSelectChange(item: any[]) {
    this.beerService.viewModel.brewType = item;
  }

  onResult(data: AroundYou) {
    this.beerService.viewModel.brewery.id = data.id
    this.beerService.viewModel.brewery.name = data.name
    this.searchBrewery = false;
    this.setMenu()
  }

  activateSearchBrewery() {
    if (this.searchBrewery) {
      this.searchBrewery = false;
      this.setMenu()
    } else {
      this.searchBrewery = true;
      this.menuService.setNewState({
        visibleSearchInput: true,
        visibleTitle: false,
        onInput: (e: string) => {
          // this.activeSearchString = e;
          this.searchSubject.next(e)
        }
      })
    }
  }
}
