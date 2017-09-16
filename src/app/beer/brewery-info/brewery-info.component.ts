import { Component, OnInit } from '@angular/core';
import {BeerService} from '../beerService'

@Component({
  selector: 'app-brewery-info',
  templateUrl: './brewery-info.component.html',
  styleUrls: ['./brewery-info.component.css']
})
export class BreweryInfoComponent implements OnInit {


  constructor(private beerService: BeerService) {
  }

  ngOnInit() {
  }
}
