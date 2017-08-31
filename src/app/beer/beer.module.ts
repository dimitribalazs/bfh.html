import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BeerComponent } from './beer.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';

import { BeerRoutingModule} from './beer-routing.module';
import {BierService} from './beerService'

import {BarDetailComponent} from '../bar/bar-detail/bar-detail.component';
import { RatingComponent } from './rating/rating.component';
import { BeerInfoComponent } from './beer-info/beer-info.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule, FormsModule, ReactiveFormsModule,
     BeerRoutingModule
  ],
  declarations: [
    BeerComponent,
    BeerDetailComponent,
    BarDetailComponent,
    RatingComponent,
    BeerInfoComponent
  ],
  providers: [BierService]
})
export class BeerModule { }
