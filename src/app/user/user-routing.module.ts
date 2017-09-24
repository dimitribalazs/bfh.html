import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { BadgesComponent } from './badges/badges.component';
import { DetailComponent } from './detail/detail.component';
import { UserComponent } from './user.component';
import {AuthGuard} from '../shared/_guards/AuthGuard';

const userRoutes: Routes = [
  { path: 'user/:id',
    component: UserComponent , canActivate: [AuthGuard],
    data: {
      type: 'info'
    },
    children: [
      {
        path: '',
        children: [
          { path: '', component: FriendsComponent, canActivate: [AuthGuard] },
          { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard] },
          { path: 'favourites', component: FavouritesComponent, canActivate: [AuthGuard] },
          { path: 'badges', component: BadgesComponent, canActivate: [AuthGuard] },
          { path: 'detail', component: DetailComponent, canActivate: [AuthGuard] },
        ]
      }
    ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
