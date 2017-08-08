import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';

import {Router} from '@angular/router';

import {BeerComponent} from "./beer/beer.component";
import {AppRoutingModule} from "./app-routing.module";
import { BeerDetailComponent } from './beer/beer-detail/beer-detail.component';
import {BarsModule} from "./bar/bars.module";



@NgModule({
  declarations: [
    AppComponent,
    BeerComponent,
    BeerDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BarsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],


})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
