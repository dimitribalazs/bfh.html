import { Component, OnInit } from '@angular/core';
import {BeerService} from '../beerService'
import {MenuService} from '../../shared/services/menu.service';

@Component({
  selector: 'app-brewery-info',
  templateUrl: './brewery-info.component.html',
  styleUrls: ['./brewery-info.component.css']
})
export class BreweryInfoComponent implements OnInit {


  constructor(private beerService: BeerService, private menuService: MenuService) {
    this.menuService.setNewState(this.beerService.getMenuState());
  }

  ngOnInit() {
  }
}
