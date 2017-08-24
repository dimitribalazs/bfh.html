import { Component, OnInit } from '@angular/core';
import {Beer} from '../shared/dto/beer';
import {BeerDatabaseService} from '../shared/services/beer.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BierService} from './beerService'

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.css'],
})
export class BeerComponent implements OnInit {

  id: string;
  model: Beer = new Beer;

  constructor(private beerService: BierService,
              private route: ActivatedRoute,
              private router: Router) { }



  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Load beer:' + params['id']);
      this.id = params['id'];
      this.beerService.loadBeer(params['id']);
    });

    this.beerService.getBeer().subscribe((beer) => {
      this.model = this.beerService.getViewModel();
      console.log('Routing Mode', beer.name)})
    }

  onClick(childView: string) {
    this.router.navigate(['beer', this.id, childView]);
  }
}
