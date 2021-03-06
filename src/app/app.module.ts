import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {Router} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {BarsModule} from './bar/bars.module';
import {HomeModule} from './home/home.module';
import {BeerModule} from './beer/beer.module';
import {ErrorComponent} from './shared/components/error/error.component';
import {BeerDatabaseService} from './shared/services/beer.service';
import {UserDatabaseService} from './shared/services/user.service';
import {SearchResultModule} from './shared/components/search-result/searchResult.module';
import {UserModule} from './user/user.module';
import {BreweryModule} from './brewery/brewery.module';
import {MenuService} from './shared/services/menu.service';
import {BreweryDatabaseService} from './shared/services/brewery.service';
import {BarDatabaseService} from './shared/services/bar.service';
import {ImageUploadModule} from '../../node_modules/angular2-image-upload/lib/image-upload.module';
import {Angular2FontawesomeModule} from 'angular2-fontawesome/angular2-fontawesome';
import {SearchModule} from './search/search.module';
import {MenuBarComponent} from './shared/components/menu-bar/menu-bar.component'
import {BusinessService} from './shared/services/business.service';
import {AvailableModule} from './shared/components/available/available.module';
import {RatingModule} from './shared/components/rating/rating.module';
import {AuthenticationService} from "./shared/services/authentication.service";
import {AuthGuard} from "./shared/_guards/AuthGuard";
import {LoginModule} from "./login/login.module";
import {ServiceWorkerModule} from '@angular/service-worker';
import {DuffdErrorHandler} from './shared/components/error/duffdErrorHandler'

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    ErrorComponent,
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
    LoginModule,
    Angular2FontawesomeModule,
    ImageUploadModule.forRoot(),
    NgbModule.forRoot(),
    ServiceWorkerModule,
  ],
  providers: [
    BeerDatabaseService, BarDatabaseService, UserDatabaseService, BreweryDatabaseService, MenuService, AuthenticationService, AuthGuard, BusinessService,
    {
      provide: ErrorHandler,
      useClass: DuffdErrorHandler
    }
  ],
  bootstrap: [AppComponent],


})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
  }
}
