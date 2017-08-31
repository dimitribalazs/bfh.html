import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';



const appRoutes: Routes = [
   // { path: 'bar', component: BarComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  // { path: '/search',  redirectTo: '/search', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }) // <-- debugging purposes only
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
