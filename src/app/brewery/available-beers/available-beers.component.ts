import { Component, OnInit } from '@angular/core';
import {BreweryService} from '../breweryService';
import {Router} from '@angular/router';
import {AroundYou} from '../../shared/dto/aroundYou';
import {BeerBarModel} from "../../shared/domainModel/viewModels";
import {MenuService} from "../../shared/services/menu.service";

@Component({
  selector: 'app-available-beers',
  templateUrl: './available-beers.component.html',
  styleUrls: ['./available-beers.component.css']
})
export class AvailableBeersComponent implements OnInit {
  filter: number
  dataIsBeerModel: boolean = true;
  disableAddBeer: boolean = true;
  constructor(private breweryService: BreweryService, private router: Router, private menuService: MenuService) {
    this.dataIsBeerModel = true;
    this.filter = 3
  }

  ngOnInit() {}

  onShowBeer(id: string) {
    this.router.navigate(['beer', id]);
  }

  addBeer(data: BeerBarModel) {
    this.breweryService.addBeer(data)
  }
  removeBeer(id: string) {
    this.breweryService.removeBeer(id)
  }

  addCheers(beerId: string) {
    this.breweryService.addBeerDrank(beerId)
    this.menuService.setNewState({
      titleText: 'KEEP CALM AND SAY CHEERS',
      visibleTitle: true,
      visibleBack: false,
      visibleHomeLink: true,
      visibleEdit: false
    });

    setTimeout(() => {
      this.menuService.setNewState(this.breweryService.getMenuState());
    }, 2500);
  }
}



