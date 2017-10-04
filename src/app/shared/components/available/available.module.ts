import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailableDataComponent } from './available-data/available-data.component';
import { SearchModule } from '../../../search/search.module';
import { SearchResultModule } from '../search-result/searchResult.module';
import { LinkInformationComponent } from './link-information/link-information.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SearchResultModule
  ],
  declarations: [AvailableDataComponent, LinkInformationComponent],
  exports: [AvailableDataComponent]
})
export class AvailableModule { }
