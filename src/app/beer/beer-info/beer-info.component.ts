import {Component, OnInit} from '@angular/core';
import {Beer} from '../../shared/dto/beer';
import {BeerService} from '../beerService'
import {MenuService} from '../../shared/services/menu.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-beer-info',
  templateUrl: './beer-info.component.html',
  styleUrls: ['./beer-info.component.css']
})
export class BeerInfoComponent implements OnInit {
  beer: Beer;
  model: Beer = new Beer;
  taste: String = '';
  brewType: String = '';
  id: string;

  private showMap = false;

  constructor(public beerService: BeerService,
              private menuService: MenuService,
              private router: Router,
              private route: ActivatedRoute) {
    this.menuService.setNewState(this.beerService.getMenuState());
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
}
