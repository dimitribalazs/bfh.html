import { TestBed, inject, async } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BarDatabaseService } from './bar.service';
import { Bar } from '../dto/bar';

describe('BarDatabaseService ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarDatabaseService]
    });
  });

  it('should be created', inject([BarDatabaseService], (service: BarDatabaseService) => {
    expect(service).toBeTruthy();
  }));

  it('retrieves all bars', async(inject([BarDatabaseService], (service) => {
    service.getAll().delay(500).subscribe(result => expect(result.length).toBeGreaterThan(0));
  })));

  it('retrieves one bar', async(inject([BarDatabaseService], (service) => {
    service.get('1').delay(1000).subscribe(result => expect(result).toEqual(jasmine.any(Bar)));
  })));

});
