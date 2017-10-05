import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BarComponent} from './bar.component';
import {BarsRoutingModule} from './bars-routing.module';
import {BarInfoComponent} from './bar-info/bar-info.component';
import {BarService} from './barService';
import {AvailableBeersComponent} from './available-beers/available-beers.component';
import {OpeningHoursComponent} from './opening-hours/opening-hours.component';
import {PhotosComponent} from './photos/photos.component';
import {SearchResultModule} from '../shared/components/search-result/searchResult.module';
import {AvailableModule} from '../shared/components/available/available.module';
import {MapComponent} from './map/map.component';
import {RatingModule} from '../shared/components/rating/rating.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BarsRoutingModule,
    SearchResultModule,
    RatingModule,
    AvailableModule
  ],
  declarations: [
    BarComponent,
    BarInfoComponent,
    AvailableBeersComponent,
    OpeningHoursComponent,
    PhotosComponent,
    MapComponent
  ],
  providers: [BarService]
})
export class BarsModule {
}
