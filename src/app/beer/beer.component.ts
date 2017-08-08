import { Component, OnInit } from '@angular/core';
import {Beer} from "./Beer";
import {BeerService} from "./beer.service";

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.css'],
  providers: [BeerService]
})
export class BeerComponent implements OnInit {

  title = 'Tour of Beer';
  beers: Beer[];
  selectedBeer: Beer;

  constructor(private beerService: BeerService) { }

  getBeers(): void {
    this.beerService.getBeers().then(beers => this.beers = beers);
  }

  ngOnInit(): void {
    this.getBeers();
  }

  onSelect(beer: Beer): void {
    this.selectedBeer = beer;
  }
}
