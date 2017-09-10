import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../shared/services/menu.service';
import {Observable} from 'rxjs/Observable';
import {Bar} from '../../shared/dto/bar';
import {Beer} from '../../shared/dto/beer';
import {BreweryService} from '../breweryService';

@Component({
  selector: 'app-available-beers',
  templateUrl: './available-beers.component.html',
  styleUrls: ['./available-beers.component.css']
})
export class AvailableBeersComponent implements OnInit {
  beers: Observable<Beer[]>;
  constructor(private breweryService: BreweryService) { }

  ngOnInit() {

    this.beers = this.breweryService.getAvailableBeers('1');
  }

}



