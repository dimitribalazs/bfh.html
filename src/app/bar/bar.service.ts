import { Injectable } from '@angular/core';
import {BAR} from '../home/mock';





let BarsPromise = Promise.resolve(BAR);


@Injectable()
export class BarService {
  getBars() { return BarsPromise; }

  getHero(id: number | string) {
    return BarsPromise
    // (+) before `id` turns the string into a number
      .then(heroes => heroes.find(hero => hero.id === +id));
  }
}
