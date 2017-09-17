import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BarComponent } from './bar.component';

import { BarsRoutingModule } from './bars-routing.module';
import {BarRating} from '../shared/components/rating/rating.component';
import { BarInfoComponent } from './bar-info/bar-info.component';
import {BarService} from './barService';
import { AvailableBeersComponent } from './available-beers/available-beers.component';
import { OpeningHoursComponent } from './opening-hours/opening-hours.component';
import { PhotosComponent } from './photos/photos.component';
import {RatingModel} from '../shared/components/rating/ratingModel';
import {SearchResultModule} from '../shared/components/search-result/searchResult.module';
import {AvailableModule} from '../shared/components/available/available.module';
import { MapComponent } from './map/map.component';

// import { BarService } from './bar.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BarsRoutingModule,
    SearchResultModule,
    AvailableModule
  ],
  declarations: [
    BarComponent,
    BarInfoComponent,
    BarRating,
    AvailableBeersComponent,
    OpeningHoursComponent,
    PhotosComponent,
    MapComponent,
    // BarDetailComponent
  ],
  providers: [ BarService ]
})
export class BarsModule { }
