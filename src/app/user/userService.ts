/**
 * Created by STRI on 22.08.2017.
 */
import { Injectable, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Beer} from '../shared/dto/beer';
import {isUndefined} from "util";
import {User} from '../shared/dto/user';
import {UserDatabaseService} from '../shared/services/user.service';
import {BeerDatabaseService} from "../shared/services/beer.service";

@Injectable()
export class UserService {
  user: Observable<User>;
  friends: Observable<User[]>
  favorurites: Observable<Beer[]>


  viewModel: User = new User();
  constructor(
    private userService: UserDatabaseService<User>,
    private beerService: BeerDatabaseService<Beer>) {

  }

  loadUser(id: string): Observable<User>  {
      this.user = this.userService.get(id)
      this.user.subscribe((user: User) => {
        this.viewModel = user
      });
      return this.user;
  }

  getUser(): Observable<User>  {
    return this.user;
  }

  public getViewModel() {
    return this.viewModel
  }

  getFriends(): Observable<User[]>  {
    this.friends = this.userService.getAll()
    return this.friends;
  }

  getFavorurites(): Observable<Beer[]>  {
    this.favorurites = this.beerService.getAll()
    return this.favorurites;
  }
}
