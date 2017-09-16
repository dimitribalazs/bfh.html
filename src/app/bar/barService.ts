/**
 * Created by STRI on 22.08.2017.
 */
<<<<<<< HEAD
import { Injectable, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Beer, DropDownEntry} from '../shared/dto/beer';
import {BeerDatabaseService} from '../shared/services/beer.service';
import {BarDatabaseService} from '../shared/services/bar.service';
import {Bar, OpeningHours} from '../shared/dto/bar';
import {BarBeer} from '../shared/dto/barBeer';
import {GeoData} from '../shared/dto/geoData';
=======
import { Injectable } from '@angular/core';
import {BusinessService} from '../shared/services/business.service';
import {BarModel} from '../shared/domainModel/viewModels';
>>>>>>> remotes/origin/develop

@Injectable()
export class BarService {

  viewModel: BarModel = new BarModel();

  constructor(
    private businessService: BusinessService) {
    // this.viewModel = new BarModel();
    // this.viewModel.openingHours = new OpeningHours();

    // console.log("save bar");
    // var bb = new BarBeer();
    // bb.beer = "1";
    // bb.bar = "2";
    // bb.price = 22.2;
    // bb.tapOrBottled = true;
    // this.barService.addBeerToBar(bb);
    //
    // bb = new BarBeer();
    // bb.beer = "2";
    // bb.bar = "2";
    // bb.price = 11.1;
    // bb.tapOrBottled = false;
    // this.barService.addBeerToBar(bb);
  }

  loadBar(id: string) {
      this.businessService.getBar(id).subscribe((bar: BarModel) => this.viewModel = bar);
  }
}
