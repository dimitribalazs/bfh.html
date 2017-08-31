import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FriendsComponent } from './friends.component';

const friendsRoutes: Routes = [
  { path: 'friends',
    component: FriendsComponent,
    },
];

@NgModule({
  imports: [
    RouterModule.forChild(friendsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FriendsRoutingModule { }
