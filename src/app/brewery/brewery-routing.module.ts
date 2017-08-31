import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {BreweryComponent} from './brewery.component';

const breweryRoutes: Routes = [
  { path: 'brewery',
    component: BreweryComponent,
    },
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
