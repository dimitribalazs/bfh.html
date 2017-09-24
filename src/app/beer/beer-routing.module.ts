import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BeerComponent } from './beer.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { BeerInfoComponent } from './beer-info/beer-info.component';
import { BeerMapComponent } from './beer-map/beer-map.component';
import {BreweryInfoComponent} from './brewery-info/brewery-info.component';
import {AvailableBeersComponent} from './available-bars/available-bars.component';
import {AuthGuard} from '../shared/_guards/AuthGuard';
// import {BarInfoComponent} from '../bar/bar-info/bar-info.component';

const beerRoutes: Routes = [
  { path: 'beer/:id/edit',
    component: BeerComponent  , canActivate: [AuthGuard],
    data: {
      type: 'edit'
    },
    children: [
      {
        path: '',
        children: [
          { path: 'details', component: BeerDetailComponent , canActivate: [AuthGuard] },
          { path: '', component: BeerDetailComponent , canActivate: [AuthGuard] }
        ]
      }
    ]},
  { path: 'beer/:id/:children/edit',
    component: BeerComponent  , canActivate: [AuthGuard],
    data: {
      type: 'edit'
    },
    children: [
      {
        path: '',
        children: [
          { path: 'details', component: BeerDetailComponent, canActivate: [AuthGuard] },
          { path: '', component: BeerDetailComponent, canActivate: [AuthGuard] }
        ]
      }
    ]},
  { path: 'beer/new',
    component: BeerComponent, canActivate: [AuthGuard],
    data: {
      type: 'new'
    },
    children: [
      {
        path: '',
        children: [
          { path: 'details', component: BeerDetailComponent, canActivate: [AuthGuard] },
          { path: '', component: BeerDetailComponent, canActivate: [AuthGuard] }
        ]
      }
    ]},
  { path: 'beer/:id',
    component: BeerComponent, canActivate: [AuthGuard],
    data: {
      type: 'info'
    },
    children: [
      {
        path: '',
        children: [
          { path: '', component: BeerInfoComponent, canActivate: [AuthGuard] },
          { path: 'info', component: BeerInfoComponent, canActivate: [AuthGuard] },
          { path: 'brewery', component: BreweryInfoComponent, canActivate: [AuthGuard] },
          { path: 'bars', component: AvailableBeersComponent, canActivate: [AuthGuard] },
          { path : 'map', component: BeerMapComponent, canActivate: [AuthGuard] }
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
