import { Injectable } from '@angular/core';
import {BAR} from "./mock-Bar";





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
