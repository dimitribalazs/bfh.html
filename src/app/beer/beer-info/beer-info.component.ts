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

  constructor(private beerService: BierService) {}


  ngOnInit() {}

}
