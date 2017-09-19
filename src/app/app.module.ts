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
import {SearchResultModule} from './shared/components/search-result/searchResult.module';
import {UserModule} from './user/user.module';
import {FriendsModule} from './friends/friends.module';
import {BreweryModule} from './brewery/brewery.module';
import {MenuService} from './shared/services/menu.service';
import {BreweryDatabaseService} from './shared/services/brewery.service';
import {BarDatabaseService} from './shared/services/bar.service';
import { ImageUploadModule } from '../../node_modules/angular2-image-upload/lib/image-upload.module';
import {BarInfoComponent} from './bar/bar-info/bar-info.component';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import {SearchModule} from './search/search.module';
import { MenuBarComponent } from './shared/components/menu-bar/menu-bar.component'
import {BusinessService} from './shared/services/business.service';
import {AvailableModule} from './shared/components/available/available.module';
import {RatingModule} from './shared/components/rating/rating.module';


@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    BarsModule,
    BeerModule,
    BreweryModule,
    HomeModule,
    SearchModule,
    AvailableModule,
    SearchResultModule,
    AppRoutingModule,
    RatingModule,
    UserModule,
    FriendsModule,
    Angular2FontawesomeModule,
    ImageUploadModule.forRoot(),
    NgbModule.forRoot(),
  ],
  providers: [BeerDatabaseService, BarDatabaseService, UserDatabaseService, BreweryDatabaseService, MenuService, BusinessService],
  bootstrap: [AppComponent],


})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
