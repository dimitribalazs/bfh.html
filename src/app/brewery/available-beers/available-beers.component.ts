import { Component, OnInit } from '@angular/core';
import {BreweryService} from '../breweryService';

@Component({
  selector: 'app-available-beers',
  templateUrl: './available-beers.component.html',
  styleUrls: ['./available-beers.component.css']
})
export class AvailableBeersComponent implements OnInit {
  constructor(private breweryService: BreweryService) { }

  ngOnInit() {}

  onAddBeer() {
    // TODO
    alert('noch nicht implementiert')
  }

}



