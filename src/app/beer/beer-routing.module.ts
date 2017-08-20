import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BeerComponent } from './beer.component';
import { BeerEditComponent } from './beer-edit/beer-edit.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';

const beerRoutes: Routes = [
  { path: 'beers',  component: BeerComponent },
  { path: 'beer/edit/:id', component: BeerEditComponent },
  { path: 'beer/detail/:id', component: BeerDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(beerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BeerRoutingModule { } 
