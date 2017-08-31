import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import {Router} from '@angular/router';

import {AppRoutingModule} from './app-routing.module';
import {BarsModule} from './bar/bars.module';
import {HomeModule} from './home/home.module';
import {BeerModule} from './beer/beer.module';
import {BeerDatabaseService} from './shared/services/beer.service';
import {UserDatabaseService} from './shared/services/user.service';
import {SearchModule} from './search/search.module';
import {UserModule} from './user/user.module';
import {FriendsModule} from './friends/friends.module';
import {BreweryModule} from './brewery/brewery.module';
import {MenuService} from "./shared/services/menu.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    BarsModule,
    BeerModule,
    BreweryModule,
    HomeModule,
    SearchModule,
    AppRoutingModule,
    UserModule,
    FriendsModule,
    NgbModule.forRoot()
  ],
  // providers: [BeerDatabaseService],
  providers: [BeerDatabaseService, UserDatabaseService, MenuService],
  bootstrap: [AppComponent],


})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
