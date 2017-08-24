import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BeerComponent } from './beer.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import {BarDetailComponent} from '../bar/bar-detail/bar-detail.component';

const beerRoutes: Routes = [
  { path: 'beer/:id',
    component: BeerComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'brewery', component: BarDetailComponent },
          { path: 'bars', component: BarDetailComponent },
          { path: 'details', component: BeerDetailComponent },
          { path: '', component: BeerDetailComponent }
        ]
      }
    ]},
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
