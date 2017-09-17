import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailableDataComponent } from './available-data/available-data.component';
import {SearchModule} from '../../../search/search.module';
import {SearchResultModule} from '../search-result/searchResult.module';

@NgModule({
  imports: [
    CommonModule,
    SearchResultModule
  ],
  declarations: [AvailableDataComponent],
  exports: [AvailableDataComponent]
})
export class AvailableModule { }
