import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from '../shared/_guards/AuthGuard';
import {LoginComponent} from './login.component';

const homeRoutes: Routes = [
  { path: 'login',  component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule { }
