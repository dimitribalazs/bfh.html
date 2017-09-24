import { TestBed, inject, async } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';

import { BreweryDatabaseService } from './brewery.service';
import { Beer } from '../dto/beer';


describe('BreweryDatabaseService ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ BreweryDatabaseService ]
    });
  });

  it('should be created', inject([BreweryDatabaseService], (service: BreweryDatabaseService) => {
    expect(service).toBeTruthy();
  }));

});
