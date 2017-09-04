import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BeerComponent } from './beer.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';

import { BeerRoutingModule} from './beer-routing.module';
import {BierService} from './beerService'

import {BarDetailComponent} from '../bar/bar-detail/bar-detail.component';
import { RatingComponent } from './rating/rating.component';
import { BeerInfoComponent } from './beer-info/beer-info.component';
import { ImageUploadModule } from '../../../node_modules/angular2-image-upload/lib/image-upload.module';
import {ImageUploaderComponent} from '../image-uploader/image-uploader.component';
import { TasteMultiSelectComponent } from '../shared/components/multi-select/multi-select.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

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
    BarDetailComponent,
    RatingComponent,
    BeerInfoComponent,
    ImageUploaderComponent,
    TasteMultiSelectComponent
  ],
  providers: [BierService]
})
export class BeerModule { }
