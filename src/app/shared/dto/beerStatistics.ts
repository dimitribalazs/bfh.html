import {UserBeer} from "./userBeer";

export class BeerStatistics {
  beersDrankByDate: Map<string, UserBeer[]> = new Map<string, UserBeer[]>();
  differentBeersTotal: number;
  totalDrankBeers: number;
  totalDrankBeersByBeer: Map<string, number> = new Map<string, number>();
}
