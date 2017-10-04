import {inject, TestBed} from '@angular/core/testing';
import {BeerDatabaseService} from './beer.service';

describe('BreweryDatabaseService ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeerDatabaseService]
    });
  });

  it('should be created', inject([BeerDatabaseService], (service: BeerDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
