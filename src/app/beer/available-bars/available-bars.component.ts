import {Component, OnInit} from '@angular/core';
import {BeerService} from '../beerService'
import {Router} from '@angular/router';
import {MenuService} from '../../shared/services/menu.service';
import {BeerBarModel} from '../../shared/domainModel/viewModels';

@Component({
  selector: 'app-available-bars',
  templateUrl: './available-bars.component.html',
  styleUrls: ['./available-bars.component.css']
})
export class AvailableBeersComponent implements OnInit {
  filter: number

  constructor(public beerService: BeerService,
              private menuService: MenuService,
              private router: Router) {

    this.filter = 1
  }

  setMenu() {
    this.menuService.setNewState(this.beerService.getMenuState());
  }

  ngOnInit() {
    this.setMenu()
  }

  onBarShow(id: number) {
    this.router.navigate(['bar', id]);
  }

  addBeer(data: BeerBarModel) {
    this.beerService.addBar(data)
  }

  removeBeer(id: string) {
    this.beerService.removeBar(id)
  }
}



