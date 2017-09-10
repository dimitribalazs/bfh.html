import { Component, OnInit } from '@angular/core';
import {Brewery} from '../../shared/dto/brewery';
import {BreweryService} from '../breweryService';

@Component({
  selector: 'app-brewery-info',
  templateUrl: './brewery-info.component.html',
  styleUrls: ['./brewery-info.component.css']
})
export class BreweryInfoComponent implements OnInit {

  model: Brewery = new Brewery();

  constructor(private breweryService: BreweryService) {
  }

  ngOnInit() {
    this.breweryService.getBrewery().subscribe((beer) => {
      this.model = this.breweryService.getViewModel();
    })
  }
}
