import { Component, OnInit } from '@angular/core';
import { Bar } from '../shared/dto/Bar';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Beer} from '../shared/dto/Beer';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {BeerDatabaseService} from '../shared/services/beer.service';
import * as NewBeer from '../shared/dto/Beer';
import {AroundYou} from './AroundYouModel';
import {User} from '../shared/dto/user';
import {GeoData} from '../shared/dto/geoData';
import {UserDatabaseService} from '../shared/services/user.service';
import {GeoService} from '../shared/services/geo.service';
import {MenuService} from "../shared/services/menu.service";


@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Duffd';
   beers: Observable<Beer[]>;
  users: Observable<User[]>;
   arroundYou: AroundYou[] = new Array();
  menu: MenuService;


  private selectedId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceBeer: BeerDatabaseService<Beer>,
    private serviceUser: UserDatabaseService<User>,
    private serviceGeo: GeoService,
    private menuService: MenuService
  ) {
    this.menu = menuService;
    this.menu.TitleText = 'Duff\'d';
    this.menu.visibleHomeLink = false;
    this.menu.visibleSearchLink = true;
    this.menu.visibleTitle = true;
    this.menu.visibleSearchInput = false;
    this.menu.visibleEdit = false;
  }


  ngOnInit() {

    this.beers = this.serviceBeer.getAll()

    this.beers.subscribe((value) => {
      value.forEach((beer) => {
        const a: AroundYou = new AroundYou();
        a.id = beer.id;
        a.name = beer.name;
        a.routerNavigate = '/beer/'
        if (this.arroundYou.length < 5) {
          this.arroundYou.push(a)
        }
      })
    })

      this.serviceBeer.listen();


  }

  isSelected(around: AroundYou) { return around.id === this.selectedId; }

  // onSelect(beer: Beer) {
  //   this.router.navigate(['/beer/edit/', beer.id]);
  // }

  onSelect(around: AroundYou) {
    this.router.navigate([around.routerNavigate, around.id]);
  }

  changeDb(event): void {
    console.log(event);
  }

  createBeer(event): void {
    console.log(event);

    // const beer = new NewBeer.Beer();
    // beer.name = "Bier vo ergendwo";
    // beer.volume = 20;
    // beer.description = "super fein";
    // beer.taste = NewBeer.Taste.Fruchtig;
    // this.databaseService.create(beer);
  }

  checkLocation() {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
           const coords: Coordinates  = pos.coords;

           let currentPos: GeoData = {
            id: "10",
            longitude: coords.longitude,
            latitude: coords.latitude
           }
          //Wohlen AG
          var lat = 47.349365;
          var long = 8.276876;

          var wohlen: GeoData = {
            id: "11",
            longitude: long,
            latitude: lat
          };

          //waltenschwil
          var lat1 = 47.334727;
          var long1 = 8.300650;
          
          var waltenschwil: GeoData = {
            id: "12",
            longitude: long1,
            latitude: lat1
          };
          var foo = this.serviceGeo.isInRange(wohlen, waltenschwil);
          console.log("result 1 " + foo);

          var lausanne: GeoData = {
            id: "13",
            longitude: 6.632273,
            latitude: 46.519653
          };
          foo = this.serviceGeo.isInRange(wohlen, lausanne);
          console.log("result 2 " + foo);
  
      }); 
    }
  }   
}
