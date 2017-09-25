import { TestBed, inject, async } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';

import { BeerDatabaseService } from './beer.service';
import { Beer } from '../dto/beer';


describe('BreweryDatabaseService ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ BeerDatabaseService ]
    });
  });

  it('should be created', inject([BeerDatabaseService], (service: BeerDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
