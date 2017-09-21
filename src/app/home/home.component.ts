import {Component, OnInit} from '@angular/core';
import {Bar} from '../shared/dto/Bar';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {Beer} from '../shared/dto/Beer';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BeerDatabaseService} from '../shared/services/beer.service';
import {AroundYou} from '../shared/dto/aroundYou';
import {User} from '../shared/dto/user';
import {GeoData} from '../shared/dto/geoData';
import {UserDatabaseService} from '../shared/services/user.service';
import {GeoService} from '../shared/services/geo.service';
import {MenuService} from '../shared/services/menu.service';
import {Brewery} from '../shared/dto/brewery';
import {BreweryDatabaseService} from '../shared/services/brewery.service';
import {BarDatabaseService} from '../shared/services/bar.service';
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {BusinessService} from "../shared/services/business.service";


@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Duffd';
  beers: Observable<Beer[]>;
  users: Observable<User[]>;
  brewery: Observable<Brewery[]>;
  bars: Observable<Bar[]>;
  //arroundYou: AroundYou[] = new Array();
  arroundYou: Observable<AroundYou[]> = new Observable<AroundYou[]>();
  distance: number = 0;

  private selectedId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private serviceBeer: BeerDatabaseService,
              private serviceUser: UserDatabaseService,
              private serviceBrewery: BreweryDatabaseService,
              private serviceBar: BarDatabaseService,
              private serviceGeo: GeoService,
              private menuService: MenuService,
              private businessService: BusinessService
  ) {

  }


  ngOnInit() {
    // console.log("init");

    this.menuService.setNewState({
      titleText: 'Duff\'d',
      visibleSearchLink: true,
      visibleTitle: true,
      visibleMenu: true
    });

    this.beers = this.serviceBeer.getAll();

    this.users = this.serviceUser.getAll()

    this.brewery = this.serviceBrewery.getAll()

    this.bars = this.serviceBar.getAll()

    //Wohlen AG
    var lat = 47.349365;
    var long = 8.276876;

    var wohlen: GeoData = {
      longitude: long,
      latitude: lat
    };


    this.arroundYou = this.businessService.getAroundYou(wohlen, "");

  }

  isSelected(around: AroundYou) {
    return around.id === this.selectedId;
  }

  // onSelect(beer: Beer) {
  //   this.router.navigate(['/beer/edit/', beer.id]);
  // }

  onSelect(around: AroundYou) {
    this.router.navigate([around.routerNavigate, around.id]);
  }

  changeDb(event): void {
    // console.log(event);
  }

  createBeer(event): void {
    // console.log(event);

    // const beer = new NewBeer.Beer();
    // beer.name = "Bier vo ergendwo";
    // beer.volume = 20;
    // beer.description = "super fein";
    // beer.taste = NewBeer.Taste.Fruchtig;
    // this.databaseService.create(beer);
  }

  checkLocation() {
    this.serviceUser.getFavoriteBeersOfUser("1").subscribe((data) => console.log("favs", data));
    this.serviceUser.getFriendsOfUser("1").subscribe((data) => console.log("friends", data));


    //Wohlen AG
    var lat = 47.349365;
    var long = 8.276876;

    var wohlen: GeoData = {
      longitude: long,
      latitude: lat
    };
    this.serviceUser.getAroundYou(wohlen, "1").subscribe((data) => console.log("around", data));

    var foo = false;
    if(foo) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords: Coordinates = pos.coords;

          let currentPos: GeoData = {
            longitude: coords.longitude,
            latitude: coords.latitude
          }
          //Wohlen AG
          var lat = 47.349365;
          var long = 8.276876;

          var wohlen: GeoData = {
            longitude: long,
            latitude: lat
          };

          //waltenschwil
          var lat1 = 47.334727;
          var long1 = 8.300650;

          var waltenschwil: GeoData = {
            longitude: long1,
            latitude: lat1
          };
          var foo = this.serviceGeo.isInRange(12);
          console.log("result 1 " + foo);

          var lausanne: GeoData = {
            longitude: 6.632273,
            latitude: 46.519653
          };
          foo = this.serviceGeo.isInRange(12);
          console.log("result 2 " + foo);

        });
      }
    }
  }
}
