import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {BreweryComponent} from './brewery.component';
import {BreweryInfoComponent} from './brewery-info/brewery-info.component';
import {AvailableBeersComponent} from './available-beers/available-beers.component';
import {AuthGuard} from '../shared/_guards/AuthGuard';

;
const breweryRoutes: Routes = [
  { path: 'brewery/:id',
    component: BreweryComponent, canActivate: [AuthGuard],
    data: {
      type: 'info'
    },
    children: [
      {
        path: '',
        children: [
          { path: '', component: BreweryInfoComponent, canActivate: [AuthGuard] },
          { path: 'beers', component: AvailableBeersComponent, canActivate: [AuthGuard] },
          { path: 'info', component: BreweryInfoComponent, canActivate: [AuthGuard] },
        ]
      }
    ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(breweryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BreweryRoutingModule { }
