import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './searchResult.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SearchResultComponent],
  exports: [SearchResultComponent]
})
export class SearchResultModule { }
