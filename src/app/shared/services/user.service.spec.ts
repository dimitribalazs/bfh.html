import { TestBed, inject, async } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';

import { UserDatabaseService } from './user.service';
import { User } from '../dto/user';
import { UserBeerRating } from '../dto/userBeerRating';
import { UserBarRating } from '../dto/userBarRating';

import {BarDatabaseService} from './bar.service';
import {BreweryDatabaseService} from './brewery.service';
import {GeoService} from './geo.service';


describe('UserDatabaseService ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ UserDatabaseService,
        BarDatabaseService,
        BreweryDatabaseService,
        GeoService ]
    });
  });

  it('should be created', inject([UserDatabaseService], (service: UserDatabaseService) => {
    expect(service).toBeTruthy();
  }));

  it('retrieves all users', async(inject( [UserDatabaseService], ( service ) => {
    service.getAll().delay(1000).subscribe(result => expect(result.length).toBeGreaterThan(0));
  })));

  it('retrieves unknown user', async(inject( [UserDatabaseService], ( service ) => {
    service.get('xyz').delay(2000).subscribe(result => expect(result).toBe(null));
  })));

});
