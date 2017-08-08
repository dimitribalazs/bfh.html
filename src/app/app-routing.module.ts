import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
// import { BarComponent } from './bar/bar.component';
import {BeerComponent} from "./beer/beer.component";


const appRoutes: Routes = [
  // { path: 'bar', component: BarComponent },
  { path: '',   redirectTo: '/bar', pathMatch: 'full' },
  {
    path: 'beer',
    component: BeerComponent,
    data: { title: 'Beer List' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }) // <-- debugging purposes only
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
