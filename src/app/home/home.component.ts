import { Component, OnInit } from '@angular/core';
import { Bar } from '../dto/Bar';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Beer} from '../dto/Beer';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {BeerDatabaseService} from '../database.service';
import * as NewBeer from '../dto/Beer';

@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // providers: [BeerDatabaseService],
})
export class HomeComponent implements OnInit {
  title = 'Duffd';
   beers: Observable<Beer[]>;
  // beers: Beer[];


  private selectedId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private databaseService: BeerDatabaseService<Beer>
  ) { }

  ngOnInit() {
    this.beers = this.route.paramMap
      .switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = params.get('id');
        return this.databaseService.getAll();
      });



      this.databaseService.listen();

    // this.beers = this.databaseService.getAll();
  }

  isSelected(beer: Beer) { return beer.id === this.selectedId; }

  onSelect(beer: Beer) {
    this.router.navigate(['/beer', beer.id]);
  }

  changeDb(event): void {
    console.log(event);
  }

  createBeer(event): void {
    console.log(event);
    // const beer = new NewBeer.Beer();
    // beer.name = "Bier vo ergendwo";
    // beer.volume = 20;
    // beer.description = "super fein";
    // beer.taste = NewBeer.Taste.Fruchtig;
    // this.databaseService.create(beer);
  }
}
