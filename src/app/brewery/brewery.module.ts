import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreweryRoutingModule} from './brewery-routing.module';
import {BreweryComponent} from './brewery.component';

@NgModule({
  imports: [
    CommonModule,
    BreweryRoutingModule
  ],
  declarations: [BreweryComponent]
})
export class BreweryModule { }
