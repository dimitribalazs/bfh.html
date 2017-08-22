import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Beer} from '../../shared/dto/beer';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormArray, Validators} from '@angular/forms';
import {BeerDatabaseService} from '../../shared/services/beer.service';
import { Observable } from 'rxjs/Rx';
import {BierService} from '../beerService'

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['../beer.component.css']
})
export class BeerDetailComponent implements OnInit {

  beer: Beer;
  model: Beer = new Beer;

  @Output() onAddBeer = new EventEmitter<Beer>();

  constructor(private beerService: BierService) {
  }


  ngOnInit() {
    this.beerService.getBeer().subscribe((beer) => {
      this.model = this.beerService.getViewModel();
    })
  }


  save(model: Beer) {
    console.log(model.name);
    this.beerService.saveBeer(model);
  }

}
