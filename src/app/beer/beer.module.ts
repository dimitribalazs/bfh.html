import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BeerComponent } from './beer.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';

import { BeerRoutingModule} from './beer-routing.module';
import {BierService} from './beerService'

import {BeerRating} from '../shared/components/rating/rating.component';
import { BeerInfoComponent } from './beer-info/beer-info.component';
import { ImageUploadModule } from '../../../node_modules/angular2-image-upload/lib/image-upload.module';
import {ImageUploaderComponent} from '../image-uploader/image-uploader.component';
import { TasteMultiSelectComponent } from '../shared/components/multi-select/multi-select.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {BarInfoComponent} from '../bar/bar-info/bar-info.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    BeerRoutingModule,
    ImageUploadModule.forRoot(),
  ],
  declarations: [
    BeerComponent,
    BeerDetailComponent,
    BeerInfoComponent,
    BeerRating,
    ImageUploaderComponent,
    TasteMultiSelectComponent
  ],
  providers: [BierService]
})
export class BeerModule { }
