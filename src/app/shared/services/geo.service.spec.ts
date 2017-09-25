import { TestBed, inject, async } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';

import { GeoService } from './geo.service';
import {GeoData} from '../dto/geoData';


describe('GeoService ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ GeoService ]
    });
  });

  it('should be created', inject([GeoService], (service: GeoService) => {
    expect(service).toBeTruthy();
  }));

  it('checks if 79 is in your range', async(inject( [GeoService], ( service ) => {
    expect(service.isInAroundYouRange(79)).toBe(true);
  })));

  it('checks if 85 is not in your range', async(inject( [GeoService], ( service ) => {
    expect(service.isInAroundYouRange(85)).toBe(false);
  })));
});
