import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Beer} from '../../shared/dto/beer';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormArray, Validators} from '@angular/forms';
import {BeerDatabaseService} from '../../shared/services/beer.service';
import { Observable } from 'rxjs/Rx';
import {BierService} from '../beerService'
import {MenuService} from '../../shared/services/menu.service';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['../beer.component.css']
})
export class BeerDetailComponent implements OnInit {

  beer: Beer;
  model: Beer = new Beer;
  menu: MenuService;

  @Output() onAddBeer = new EventEmitter<Beer>();

  constructor(private beerService: BierService, private menuService: MenuService) {
    this.menu = menuService;
    this.menu.TitleText = 'Beer info';
    this.menu.visibleHomeLink = true;
    this.menu.visibleSearchLink = false;
    this.menu.visibleTitle = true;
    this.menu.visibleSearchInput = false;
    this.menu.visibleEdit = true;
  }


  ngOnInit() {
    this.beerService.getBeer().subscribe((beer) => {
      this.model = this.beerService.getViewModel();
    })
  }



  onSubmit() {
    this.beerService.submit();
  }

}
