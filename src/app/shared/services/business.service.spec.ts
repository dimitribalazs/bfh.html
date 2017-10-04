import {inject, TestBed} from '@angular/core/testing';
import {BusinessService} from './business.service';
import {BeerDatabaseService} from '../services/beer.service';
import {BreweryDatabaseService} from '../services/brewery.service'
import {BarDatabaseService} from '../services/bar.service';
import {UserDatabaseService} from '../services/user.service';
import {GeoService} from '../services/geo.service';

describe('BusinessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessService,
        BeerDatabaseService,
        BreweryDatabaseService,
        BarDatabaseService,
        UserDatabaseService,
        GeoService]
    });
  });

  it('should be created', inject([BusinessService], (service: BusinessService) => {
    expect(service).toBeTruthy();
  }));
});
