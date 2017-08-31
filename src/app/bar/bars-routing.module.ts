import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BarComponent }    from './bar.component';
import { BarDetailComponent }  from './bar-detail/bar-detail.component';

const barsRoutes: Routes = [
  { path: 'bars',  component: BarComponent },
  { path: 'bar/:id', component: BarComponent }
  // { path: 'bar/:id', component: BarDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(barsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BarsRoutingModule { }
