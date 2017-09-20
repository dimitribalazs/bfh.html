import {UserBeer} from "./userBeer";

export class BeerStatistics {
  beersDrankByDate: Map<string, UserBeer[]> = new Map<string, UserBeer[]>();
  differentBeersTotal: number;
}
