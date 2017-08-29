import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';

import { HomeRoutingModule } from './home-routing.module';
import {BeerTop10Component} from '../beer/beer-top10/beer-top10.component';

// import { HomeService } from './home.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    BeerTop10Component
  ],
  providers: [  ]
   // providers: [ HomeService ]
})
export class HomeModule { }
