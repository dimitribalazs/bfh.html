import { Component, OnInit } from '@angular/core';
import { Bar } from '../shared/dto/bar';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Beer } from '../shared/dto/beer';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BeerDatabaseService } from '../shared/services/beer.service';
import { AroundYou } from '../shared/domainModel/aroundYou';
import { User } from '../shared/dto/user';
import { GeoData } from '../shared/dto/geoData';
import { UserDatabaseService } from '../shared/services/user.service';
import { GeoService } from '../shared/services/geo.service';
import { MenuService } from '../shared/services/menu.service';
import { Brewery } from '../shared/dto/brewery';
import { BreweryDatabaseService } from '../shared/services/brewery.service';
import { BarDatabaseService } from '../shared/services/bar.service';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { BusinessService } from "../shared/services/business.service";

@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Duffd';
  arroundYou: Observable<AroundYou[]> = new Observable<AroundYou[]>();
  private selectedId: string;

  constructor(private router: Router,
    private menuService: MenuService,
    public businessService: BusinessService
  ) { }


  ngOnInit() {
    this.menuService.setNewState({
      titleText: 'Duff\'d',
      visibleSearchLink: true,
      visibleTitle: true,
      visibleMenu: true
    });

    this.arroundYou = this.businessService.getAroundYou();
    this.businessService.topBeer();

    this.businessService.positionSubject.subscribe(() => {
      this.arroundYou = this.businessService.getAroundYou();
    })
  }

  isSelected(around: AroundYou) {
    return around.id === this.selectedId;
  }

  onSelect(around: AroundYou) {
    this.router.navigate([around.routerNavigate, around.id]);
  }
}
