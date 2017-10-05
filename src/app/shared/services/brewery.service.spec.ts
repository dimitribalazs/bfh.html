import {inject, TestBed} from '@angular/core/testing';
import {BreweryDatabaseService} from './brewery.service';

describe('BreweryDatabaseService ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreweryDatabaseService]
    });
  });

  it('should be created', inject([BreweryDatabaseService], (service: BreweryDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
