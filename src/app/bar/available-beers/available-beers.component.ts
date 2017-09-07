import { Component, OnInit } from '@angular/core';
import {BarService} from '../barService';
import {MenuService} from '../../shared/services/menu.service';
import {Observable} from 'rxjs/Observable';
import {Bar} from '../../shared/dto/bar';
import {Beer} from "../../shared/dto/beer";

@Component({
  selector: 'app-available-beers',
  templateUrl: './available-beers.component.html',
  styleUrls: ['./available-beers.component.css']
})
export class AvailableBeersComponent implements OnInit {
  beers: Observable<Beer[]>;
  constructor(private barService: BarService) { }

  ngOnInit() {

    this.beers = this.barService.getAvailableBeers('1');
  }

}
