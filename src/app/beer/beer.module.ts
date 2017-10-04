import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BeerComponent } from './beer.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { BeerRoutingModule } from './beer-routing.module';
import { BeerService } from './beerService'
import { BeerInfoComponent } from './beer-info/beer-info.component';
import { ImageUploadModule } from '../../../node_modules/angular2-image-upload/lib/image-upload.module';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';
import { TasteMultiSelectComponent } from '../shared/components/multi-select/multi-select.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { BarInfoComponent } from '../bar/bar-info/bar-info.component';
import { SearchResultModule } from '../shared/components/search-result/searchResult.module';
import { BreweryInfoComponent } from './brewery-info/brewery-info.component';
import { AvailableBeersComponent } from './available-bars/available-bars.component';
import { AvailableModule } from '../shared/components/available/available.module';
import { RatingModule } from '../shared/components/rating/rating.module';
import { BeerMapComponent } from './beer-map/beer-map.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    BeerRoutingModule,
    SearchResultModule,
    RatingModule,
    AvailableModule,
    ImageUploadModule.forRoot(),
  ],
  declarations: [
    BeerComponent,
    BeerDetailComponent,
    BeerInfoComponent,
    BreweryInfoComponent,
    AvailableBeersComponent,
    ImageUploaderComponent,
    TasteMultiSelectComponent,
    BeerMapComponent
  ],
  providers: [BeerService]
})
export class BeerModule { }
