import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserService } from './userService';
import { FriendsComponent } from './friends/friends.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { BadgesComponent } from './badges/badges.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [UserComponent, FriendsComponent, FavouritesComponent, BadgesComponent, DetailComponent],
  providers: [UserService]
})
export class UserModule { }
