import { Injectable } from '@angular/core';
import {BAR, BEER} from './mock';
import {Beer} from '../beer/Beer';


@Injectable()
export class HomeService {
  getBeers(): Promise<Beer[]> {
    return Promise.resolve(BEER);
  }

  // See the "Take it slow" appendix
  getBeersSlowly(): Promise<Beer[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getBeers()), 2000);
    });
  }
}
