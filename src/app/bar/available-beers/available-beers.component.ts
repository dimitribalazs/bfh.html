import {Component, OnInit} from '@angular/core';
import {BarService} from '../barService';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/Rx';
import {MultiNavigationModel} from '../../shared/domainModel/multiNavigationModel';
import {BeerBarModel} from '../../shared/domainModel/viewModels';
import {AroundYou} from '../../shared/dto/aroundYou';
import {MenuService} from "../../shared/services/menu.service";
import {BeerService} from "../../beer/beerService";

@Component({
  selector: 'app-available-beers',
  templateUrl: './available-beers.component.html',
  styleUrls: ['./available-beers.component.css']
})
export class AvailableBeersComponent implements OnInit {
  // beers: Observable<Beer[]>;

  filter: number
  service: BarService

  constructor(private barService: BarService,
              private router: Router,
              private menuService: MenuService) {
    this.service = barService;
    this.filter = 3
  }

  ngOnInit() {
  }

  addCheers(beerId: string) {
    this.barService.addBeerDrank(beerId)
    this.menuService.setNewState({
      titleText: 'KEEP CALM AND SAY CHEERS',
      visibleTitle: true,
      visibleBack: false,
      visibleHomeLink: true,
      visibleEdit: false
    });

    setTimeout(() => {
      this.menuService.setNewState(this.barService.getMenuState());
    }, 2500);
  }
  onShowBeer(id: string) {
    this.router.navigate(['beer', id]);
  }

  addBeer(data: BeerBarModel) {
    this.barService.addBar(data)
  }
  removeBeer(id: string) {
    this.barService.removeBar(id)
  }
}



