import { Injectable } from '@angular/core';
import {Beer} from "./Beer";
import {BEER} from "./mock-Beer";

@Injectable()
export class BeerService {
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
