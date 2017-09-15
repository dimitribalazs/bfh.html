import { Component, OnInit } from '@angular/core';
import {BreweryService} from '../breweryService';

@Component({
  selector: 'app-brewery-info',
  templateUrl: './brewery-info.component.html',
  styleUrls: ['./brewery-info.component.css']
})
export class BreweryInfoComponent implements OnInit {


  constructor(private breweryService: BreweryService) {
  }

  ngOnInit() {
  }
}
