import { Component, OnInit } from '@angular/core';
import {BeerService} from '../beerService'

@Component({
  selector: 'app-available-beers',
  templateUrl: './available-beers.component.html',
  styleUrls: ['./available-beers.component.css']
})
export class AvailableBeersComponent implements OnInit {
  constructor(private beerService: BeerService) { }

  ngOnInit() {}

  onAddBeer() {
    // TODO
    alert('noch nicht implementiert')
  }

}



