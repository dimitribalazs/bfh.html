import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BeerComponent } from './beer.component';
import { BeerEditComponent } from './beer-edit/beer-edit.component';

const beerRoutes: Routes = [
  { path: 'beers',  component: BeerComponent },
  { path: 'beer/:id', component: BeerEditComponent }
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
