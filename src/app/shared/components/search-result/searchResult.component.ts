import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { BeerDatabaseService } from '../../services/beer.service'
import { Beer } from '../../dto/beer';
import { Subscription } from 'rxjs/Subscription';
import { BreweryDatabaseService } from '../../services/brewery.service';
import { UserDatabaseService } from '../../services/user.service';
import { BarDatabaseService } from '../../services/bar.service';
import { isNullOrUndefined } from 'util';
import { Constants } from '../../constants';
import { MultiNavigationModel } from '../../domainModel/multiNavigationModel';

@Component({
  selector: 'app-search-result',
  templateUrl: './searchResult.component.html',
  styleUrls: ['./searchResult.component.css']
})
/**
 * Displays search resuls.
 *
 * In case nothing could be found, this component provides features to create new entries based on search input.
 */
export class SearchResultComponent implements OnInit {
  @Input() search: Observable<string>;
  @Input() filter: Observable<number>;
  @Input() ignorList: Observable<Array<MultiNavigationModel>>;
  @Input() addDisable: boolean;
  @Output() onSearchResult = new EventEmitter<MultiNavigationModel>()
  @Output() onAddBeer = new EventEmitter<string>()

  result: Array<String>
  beer: Beer[] = [];
  beers: Observable<Beer[]>;
  arroundYou: MultiNavigationModel[] = new Array();
  filterNumber: number;
  numberOfBeers: number;
  numberOfBars: number;
  numberOfBrewerys: number;
  entriesNotFound: string;

  itemIgnorlist: Array<MultiNavigationModel> = new Array();

  searchString: string;

  subscription: Subscription = new Subscription()

  public viewModelSubject: Subject<MultiNavigationModel[]> = new BehaviorSubject<MultiNavigationModel[]>(this.arroundYou);

  constructor(private beerService: BeerDatabaseService,
    private breweryService: BreweryDatabaseService,
    private barService: BarDatabaseService,
    private userService: UserDatabaseService) {
    this.arroundYou = new Array()
    this.viewModelSubject.asObservable();

    // sort the search result and set the entriesNotFound string
    this.viewModelSubject.map(arr => arr.sort(
      (a: MultiNavigationModel, b: MultiNavigationModel) => a.name.localeCompare(b.name))).subscribe(() => {
        this.entriesNotFound = ''
        if (this.numberOfBars === 0 && this.filterNumber === 0 || this.filterNumber === 1) {
          this.entriesNotFound = 'bar'
        }
        if (this.numberOfBeers === 0 && this.filterNumber === 0 || this.filterNumber === 3) {
          this.entriesNotFound += this.entriesNotFound.length > 0 ? ', beer' : 'beer'
        }
        if (this.numberOfBrewerys === 0 && this.filterNumber === 0 || this.filterNumber === 2) {
          this.entriesNotFound += this.entriesNotFound.length > 0 ? ', brewery' : 'brewery'
        }
        this.entriesNotFound += this.entriesNotFound.length > 0 ? ' ' : ''
      })
    this.filterNumber = 0;
    this.numberOfBeers = 0;
    this.numberOfBars = 0;
    this.numberOfBrewerys = 0;
    this.searchString = '';
  }

  ngOnInit() {
    this.filter.subscribe((filter) => this.filterNumber = filter)

    if (!isNullOrUndefined(this.ignorList)) {
      this.ignorList.subscribe((ignoreValue) => {
        this.itemIgnorlist = new Array();
        if (!isNullOrUndefined(ignoreValue)) {
          Object.keys(ignoreValue).map(value => {
            const model: MultiNavigationModel = new MultiNavigationModel();
            model.name = ignoreValue[value].name;
            model.routerNavigate = ignoreValue[value].routerNavigate
            this.itemIgnorlist.push(model)
          })
        }
      })
    }

    this.search.subscribe((value) => {
      // save the search string
      const s: string = value as string;
      this.searchString = value as string;
      this.numberOfBeers = 0;
      this.numberOfBars = 0;
      this.numberOfBrewerys = 0;

      this.userService.searchResults(s).subscribe(data => {
        // reset the model
        this.arroundYou = [];
        this.viewModelSubject.next(this.arroundYou);
        let searchResults = data || [];
        Object.keys(searchResults).map((resultKey) => {
          let isBar = resultKey.indexOf("bar") !== -1 && (this.filterNumber === 0 || this.filterNumber === 1);
          let isBrewery = resultKey.indexOf("brewery") !== -1 && (this.filterNumber === 0 || this.filterNumber === 2);
          let isBeer = resultKey.indexOf("beer") !== -1 && (this.filterNumber === 0 || this.filterNumber === 3);
          let isUser = resultKey.indexOf("user") !== -1 && (this.filterNumber === 0 || this.filterNumber === 4);

          let searchData = searchResults[resultKey];
          const a: MultiNavigationModel = new MultiNavigationModel();
          a.id = searchData.id;
          a.name = searchData.searchDisplay;
          if (isUser) {
            a.icon = 'fa fa-user';
            a.routerNavigate = Constants.ROUTING_PARENT_USER
            this.arroundYou.push(a);
          } else if (isBeer) {
            this.numberOfBeers++
            a.icon = 'fa fa-beer';
            a.routerNavigate = Constants.ROUTING_PARENT_BEER
            this.arroundYou.push(a);
          } else if (isBar) {
            this.numberOfBars++
            a.icon = 'fa fa-cutlery';
            a.routerNavigate = Constants.ROUTING_PARENT_BAR
            this.arroundYou.push(a);
          } else if (isBrewery) {
            this.numberOfBrewerys++
            a.icon = 'fa fa-industry';
            a.routerNavigate = Constants.ROUTING_PARENT_BREWERY
            this.arroundYou.push(a);
          }
        })
        this.viewModelSubject.next(this.arroundYou)
      });
    }
    )
  }

  /**
   * Check if the entry in the ignorelist
   *
   * @param entry
   * @returns {boolean} true if is in ignore list
   */
  isInIgnorelist(entry: MultiNavigationModel): boolean {
    if (isNullOrUndefined(this.itemIgnorlist)) {
      return false;
    }
    const ignore = this.itemIgnorlist.find((value) => value.name === entry.name && value.routerNavigate === entry.routerNavigate);
    return !isNullOrUndefined(ignore);
  }

  onClick(data: MultiNavigationModel) {
    this.onSearchResult.emit(data);
  }

  onNewBeer() {
    this.onAddBeer.emit(this.searchString);
  }

  onNew() {
    alert('In prototype not implemented!')
  }

  onAddFriend() {
    alert('In prototype not implemented!')
  }
}
