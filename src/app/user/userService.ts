/**
 * Created by STRI on 22.08.2017.
 */
import { Injectable, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Beer} from '../shared/dto/beer';
import {User} from '../shared/dto/user';
import {UserDatabaseService} from '../shared/services/user.service';
import {BeerDatabaseService} from '../shared/services/beer.service';

import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class UserService {
  user: Observable<User>;
  friends: Observable<User[]>
  favorurites: Observable<Beer[]>
  viewModel: User = new User();

  // Observable for user has changed
  public viewModelSubject: Subject<User> = new BehaviorSubject<User>(this.viewModel);

  constructor(
    private userService: UserDatabaseService,
    private beerService: BeerDatabaseService) {
    this.viewModelSubject.asObservable();
  }

  loadUser(id: string){
      this.user = this.userService.get(id)
      this.user.subscribe((user: User) => {
        this.viewModel = user;
        this.viewModelSubject.next(user)
      });
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
