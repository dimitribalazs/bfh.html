import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { BadgesComponent } from './badges/badges.component';
import { DetailComponent } from './detail/detail.component';
import { UserComponent } from './user.component';

const userRoutes: Routes = [
  { path: 'user/:id',
    component: UserComponent,
    data: {
      type: 'info'
    },
    children: [
      {
        path: '',
        children: [
          { path: '', component: FriendsComponent },
          { path: 'friends', component: FriendsComponent },
          { path: 'favourites', component: FavouritesComponent },
          { path: 'badges', component: BadgesComponent },
          { path: 'detail', component: DetailComponent },
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
