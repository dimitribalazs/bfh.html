import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BeerComponent } from './beer.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { BeerInfoComponent } from './beer-info/beer-info.component';
// import {BarInfoComponent} from '../bar/bar-info/bar-info.component';

const beerRoutes: Routes = [
  { path: 'beer/:id/edit',
    component: BeerComponent,
    data: {
      type: 'edit'
    },
    children: [
      {
        path: '',
        children: [
          // { path: 'brewery', component: BarInfoComponent },
          // { path: 'bars', component: BarInfoComponent },
          { path: 'details', component: BeerDetailComponent },
          { path: '', component: BeerDetailComponent }
        ]
      }
    ]},
  { path: 'beer/new',
    component: BeerComponent,
    data: {
      type: 'new'
    },
    children: [
      {
        path: '',
        children: [
          { path: 'details', component: BeerDetailComponent },
          { path: '', component: BeerDetailComponent }
        ]
      }
    ]},
  { path: 'beer/:id',
    component: BeerComponent,
    data: {
      type: 'info'
    },
    children: [
      {
        path: '',
        children: [
          { path: '', component: BeerInfoComponent }
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
