import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BeerComponent } from './beer.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';

import { BeerRoutingModule} from './beer-routing.module';

// import {BeerService} from './beer.service';
import { BeerEditComponent } from './beer-edit/beer-edit.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule, FormsModule, ReactiveFormsModule,
    BeerRoutingModule
  ],
  declarations: [
    BeerComponent,
    BeerDetailComponent,
    BeerEditComponent
  ],
  // providers: [ BeerService ]
  providers: [  ]
})
export class BeerModule { }
