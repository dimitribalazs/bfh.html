import { Component, OnInit } from '@angular/core';
import {Beer} from '../../shared/dto/beer';
import {BierService} from '../beerService'

@Component({
  selector: 'app-beer-info',
  templateUrl: './beer-info.component.html',
  styleUrls: ['./beer-info.component.css']
})
export class BeerInfoComponent implements OnInit {

  beer: Beer;
  model: Beer = new Beer;

  constructor(private beerService: BierService) {

  }


  ngOnInit() {
    this.beerService.getBeer().subscribe((beer) => {
      this.model = this.beerService.getViewModel();
    })
  }

}
