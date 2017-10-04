import { TestBed, inject, async } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
