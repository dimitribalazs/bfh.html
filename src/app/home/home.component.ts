import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.service';
import {Bar} from '../bar/Bar';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {Beer} from '../beer/Beer';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Duffd';
  beers: Observable<Beer[]>;

  private selectedId: number;

  constructor(private beerService: HomeService,
  private route: ActivatedRoute,
  private router: Router
) {}

ngOnInit() {
  this.beers = this.route.paramMap
    .switchMap((params: ParamMap) => {
      // (+) before `params.get()` turns the string into a number
      this.selectedId = +params.get('id');
      return this.beerService.getBeers();
    });
}

isSelected(beer: Beer) { return beer.id === this.selectedId; }

onSelect(beer: Beer) {
  this.router.navigate(['/beer', beer.id]);
}

}
