import { Injectable } from '@angular/core';
import {Beer} from './Beer';
import {BEER} from '../home/mock';

let BeersPromise = Promise.resolve(BEER);

@Injectable()
export class BeerService {

  getBeers() { return BeersPromise; }

  getBeer(id: number | string) {
    return BeersPromise
    // (+) before `id` turns the string into a number
      .then(heroes => heroes.find(hero => hero.id === +id));
  }
}
