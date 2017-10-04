import { Bar } from './bar';
import { Beer } from './beer';

export class BarBeer {
  beer: string;
  beerName: string;
  bar: string;
  barName: string;
  price: number;
  servingStyle: number;
}

export enum ServingStyle {
  UNDEFINED,
  BOTTLE,
  GLASS,
  CAN
}
