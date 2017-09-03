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

  // beer: Beer;
  model: Beer = new Beer;
  public submitted: boolean = false;
  public formErrorMessage: boolean = false;


  constructor(private beerService: BierService, private menuService: MenuService) {
    this.menuService.setDefault();
    this.menuService.TitleText = 'Enter or edit beer info'
    this.menuService.visibleSave = true;
    this.menuService.visibleHomeLink = true;
    this.menuService.submitCallback = () => {

      if (this.model.name.length > 0 && this.model.description.length > 0) {
        this.beerService.submit();
        this.submitted = true;
        this.formErrorMessage = false;
      } else {
        this.formErrorMessage = true;
      }
    }

  }


  ngOnInit() {
    this.beerService.getBeer().subscribe((beer) => {
      this.model = this.beerService.getViewModel();
    })
  }

}
