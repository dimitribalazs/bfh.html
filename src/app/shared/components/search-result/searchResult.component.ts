import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {BeerDatabaseService} from '../../services/beer.service'
import {Beer} from '../../dto/beer';
import {AroundYou} from '../../dto/aroundyou';
import {Subscription} from 'rxjs/Subscription';
import {Brewery} from '../../dto/brewery';
import {BreweryDatabaseService} from '../../services/brewery.service';
import {User} from '../../dto/user';
import {UserDatabaseService} from '../../services/user.service';
import {BarDatabaseService} from '../../services/bar.service';
import {Bar} from '../../dto/bar';

@Component({
  selector: 'app-search-result',
  templateUrl: './searchResult.component.html',
  styleUrls: ['./searchResult.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input() search: Observable<string>;
  @Input() filter: Observable<number>;
  @Output() onSearchResult = new EventEmitter<AroundYou>()
  @Output() onAddBeer = new EventEmitter<string>()
  @Output() onAddFriend = new EventEmitter<AroundYou>()
  @Output() onRemoveFriend = new EventEmitter<AroundYou>()


  result: Array<String>
  beer: Beer[] = [];
  beers: Observable<Beer[]>;
  arroundYou: AroundYou[] = new Array();
  aYou: AroundYou = new AroundYou();
  filterNumber: number;
  numberOfBeers: number;
  numberOfBars: number;
  numberOfBrewerys: number;
  entriesNotFound: string;

  searchString: string;

  subscription: Subscription = new Subscription()

  public viewModelSubject: Subject<AroundYou[]> = new BehaviorSubject<AroundYou[]>(this.arroundYou);

  constructor(private beerService: BeerDatabaseService,
              private breweryService: BreweryDatabaseService,
              private barService: BarDatabaseService,
              private userService: UserDatabaseService) {
    this.arroundYou = new Array()

    this.viewModelSubject.asObservable();

    // sort the search result and set the entriesNotFound string
    this.viewModelSubject.map(arr => arr.sort((a: AroundYou, b: AroundYou) => a.name.localeCompare(b.name))).subscribe(() => {
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

    this.search.subscribe((value) => {
        // save the search string
        const s: string = value as string;
        this.searchString = value as string;
        // reset the model
        this.arroundYou = [];
        this.viewModelSubject.next(this.arroundYou)
        // unsubscribe the old search subscription
        this.subscription.unsubscribe()

        if (this.filterNumber === 0 || this.filterNumber === 3) {
          // load all beer
          this.numberOfBeers = 0;
          // TODO: Direkt über den Service.... das ist sicher bei vielen Daten sicher nicht gut
          this.subscription = this.beerService.getAll().subscribe((value1) => {
            value1.forEach((beer) => {
              // create a new object
              const a: AroundYou = new AroundYou();
              a.id = beer.id;
              a.name = beer.name;
              a.icon = 'fa fa-beer';
              a.routerNavigate = '/beer/'
              // if find the search string in the beer name, emit the new result to the observer
              if (a.name.toLowerCase().indexOf(s.toLowerCase()) >= 0) {
                this.numberOfBeers++
                this.arroundYou.push(a)
                this.viewModelSubject.next(this.arroundYou)
              }
            })
          })
        }
        if (this.filterNumber === 0 || this.filterNumber === 2) {
          // load all brewery
          this.numberOfBrewerys = 0;
          // TODO: Direkt über den Service.... das ist sicher bei vielen Daten sicher nicht gut
          this.subscription = this.breweryService.getAll().subscribe((value1) => {
            value1.forEach((brewery) => {
              // create a new object
              const a: AroundYou = new AroundYou();
              a.id = brewery.id;
              a.name = brewery.name;
              a.icon = 'fa fa-industry';
              a.routerNavigate = '/brewery/'
              // if find the search string in the brewery name, emit the new result to the observer
              if (a.name.toLowerCase().indexOf(s.toLowerCase()) >= 0) {
                this.numberOfBrewerys++
                this.arroundYou.push(a)
                this.viewModelSubject.next(this.arroundYou)
              }
            })
          })
        }
        if (this.filterNumber === 0 || this.filterNumber === 1) {
          // load all bar
          this.numberOfBars = 0;
          // TODO: Direkt über den Service.... das ist sicher bei vielen Daten sicher nicht gut
          this.subscription = this.barService.getAll().subscribe((value1) => {
            value1.forEach((bar) => {
              // create a new object
              const a: AroundYou = new AroundYou();
              a.id = bar.id;
              a.name = bar.name;
              a.icon = 'fa fa-cutlery';
              a.routerNavigate = '/bar/'
              // if find the search string in the bar name, emit the new result to the observer
              if (a.name.toLowerCase().indexOf(s.toLowerCase()) >= 0) {
                this.numberOfBars++
                this.arroundYou.push(a)
                this.viewModelSubject.next(this.arroundYou)
              }
            })
          })
        }
        if (this.filterNumber === 0 || this.filterNumber === 4) {
          // user all beer
          // TODO: Direkt über den Service.... das ist sicher bei vielen Daten sicher nicht gut
          this.subscription = this.userService.getAll().subscribe((value1) => {
            value1.forEach((user) => {
              // create a new object
              const a: AroundYou = new AroundYou();
              a.id = user.id;
              a.name = user.firstname + ', ' + user.lastname;
              a.icon = 'fa fa-user';
              a.routerNavigate = '/user/'
              // if find the search string in the beer name, emit the new result to the observer
              if (a.name.toLowerCase().indexOf(s.toLocaleLowerCase()) >= 0) {
                this.arroundYou.push(a)
                this.viewModelSubject.next(this.arroundYou)
              }
            })
          })
        }
      }
    )
  }

  onClick(data: AroundYou) {
    this.onSearchResult.emit(data);
  }

  onNewBeer() {
    this.onAddBeer.emit(this.searchString);
  }

  onNew() {
    alert('In prototype not implemented!')
  }
}
