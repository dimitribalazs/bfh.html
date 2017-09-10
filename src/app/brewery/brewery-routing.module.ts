import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {BreweryComponent} from './brewery.component';
import {BreweryInfoComponent} from './brewery-info/brewery-info.component';
import {AvailableBeersComponent} from './available-beers/available-beers.component';

;
const breweryRoutes: Routes = [
  { path: 'brewery/:id',
    component: BreweryComponent,
    data: {
      type: 'info'
    },
    children: [
      {
        path: '',
        children: [
          { path: '', component: BreweryInfoComponent },
          { path: 'beers', component: AvailableBeersComponent },
          { path: 'info', component: BreweryInfoComponent },
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
