import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreweryRoutingModule} from './brewery-routing.module';
import {BreweryComponent} from './brewery.component';
import { BreweryInfoComponent } from './brewery-info/brewery-info.component';
import {BreweryService} from './breweryService';
import {AvailableBeersComponent} from './available-beers/available-beers.component';

@NgModule({
  imports: [
    CommonModule,
    BreweryRoutingModule
  ],
  declarations: [BreweryComponent, BreweryInfoComponent, AvailableBeersComponent],
  providers: [ BreweryService ]
})
export class BreweryModule { }
