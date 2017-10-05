import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search.component';
import {SearchRoutingModule} from './search-routing.module';
import {SearchResultModule} from '../shared/components/search-result/searchResult.module';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    SearchResultModule
  ],
  declarations: [SearchComponent]
})
export class SearchModule {
}
