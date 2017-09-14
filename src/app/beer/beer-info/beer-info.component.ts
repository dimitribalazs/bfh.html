import { Component, OnInit } from '@angular/core';
import {Beer} from '../../shared/dto/beer';
import {Brewery} from '../../shared/dto/brewery';
import {BierService} from '../beerService'

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

  constructor(private beerService: BierService) {
    //this.model.brewery = new Brewery();
    //todo brewery
    //this.beerService.searchBrewery = false;
  }


  ngOnInit() {
    this.beerService.getBeer().subscribe((beer) => {
      this.model = this.beerService.getViewModel();
      for (let taste of this.model.taste)
      {
        this.taste = this.taste + '{' + taste.itemName + '} '
      }
      for (let brewType of this.model.brewType)
      {
        this.brewType = this.brewType + '{' + brewType.itemName + '} '
      }
    })
  }

}
