import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import {Router} from '@angular/router';

import {AppRoutingModule} from './app-routing.module';
import {BarsModule} from './bar/bars.module';
import {HomeModule} from './home/home.module';
import {BeerModule} from './beer/beer.module';
import {BeerDatabaseService} from './database.service';
import {Beer} from './dto/beer';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    BarsModule,
    BeerModule,
    HomeModule,
    AppRoutingModule
  ],
   // providers: [{provide: 'BeerService' , useFactory: () => (new BeerDatabaseService<Beer>())}],
  providers: [BeerDatabaseService],
  bootstrap: [AppComponent],


})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
