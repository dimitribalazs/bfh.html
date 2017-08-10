import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BeerComponent } from './beer.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';

import { BeerRoutingModule} from './beer-routing.module';

import {BeerService} from './beer.service';
import { BeerEditComponent } from './beer-edit/beer-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BeerRoutingModule
  ],
  declarations: [
    BeerComponent,
    BeerDetailComponent,
    BeerEditComponent
  ],
  providers: [ BeerService ]
})
export class BeerModule { }
