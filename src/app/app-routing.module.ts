import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import {ErrorComponent} from "./shared/components/error/error.component";

const appRoutes: Routes = [
   // { path: 'bar', component: BarComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'error', component: ErrorComponent, pathMatch: 'full'},

  // { path: '/search-result',  redirectTo: '/search-result', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }) // <-- debugging purposes only
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
