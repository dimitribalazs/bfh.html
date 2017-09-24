import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import * as firebase from 'firebase';
import {DatabaseService, FirebaseEvent} from './database.service';
import {FirebaseRefs, getFirebaseRef} from './firebase';
import {Beer} from '../dto/beer';
import {BarBeer} from "../dto/barBeer";
import {UserBeerRating} from "../dto/userBeerRating";
import {UserBeer} from "../dto/userBeer";
import {BeerStatistics} from "../dto/beerStatistics";
import {isNullOrUndefined} from "util";

@Injectable()
export class BeerDatabaseService extends DatabaseService {
  private beersPath: firebase.database.Reference;
  private barBeersPath: firebase.database.Reference;
  private userBeerRatingsPath: firebase.database.Reference;
  private userBeerDrankPath: firebase.database.Reference;

  constructor() {
    super();
    this.beersPath = getFirebaseRef(FirebaseRefs.Beers);
    this.barBeersPath = getFirebaseRef(FirebaseRefs.BarBeers);
    this.userBeerRatingsPath = getFirebaseRef(FirebaseRefs.UserBeerRatings);
    this.userBeerDrankPath = getFirebaseRef(FirebaseRefs.UserBeerDrank);
  }

  /**
   * Checks if beer already exists
   * @param {Beer} entity
   * @returns {Promise<boolean>}
   */
  exists(entity: Beer): Promise<boolean> {
    if(isNullOrUndefined(entity)) throw new Error("entity must be defined");

    return new Promise<boolean>((resolve, reject) => {
      this.beersPath.orderByChild("name").equalTo(entity.name).once(FirebaseEvent.value).then((snapshot) => {
        const beers = snapshot.val(); //as Beer[];
        //if (!isNullOrUndefined(beers)) {
        beers.forEach((beer) => {
          if (beer.name === entity.name) {
            // if (beer.brewery.name === entity.brewery.name && beer.volume === entity.volume) {
            resolve(true)
          }
          resolve(false)
        })
        //}
        resolve(false)
      })
    })
  }


  /**
   * Create new beer
   * @param {Beer} entity
   * @returns {string}
   */
  create(entity: Beer): string {
    if(isNullOrUndefined(entity)) throw new Error("entity must be defined");

    const newKey: string = this.beersPath.push().key;
    entity.id = newKey
    this.beersPath.child(newKey).set(entity);
    return newKey;
  }

  /**
   * Update existing beer
   * @param {string} id
   * @param {Beer} entity
   */
  update(id: string, entity: Beer): void {
    if(isNullOrUndefined(id)) throw new Error("id must be defined");
    if(isNullOrUndefined(entity)) throw new Error("entity must be defined");

    //https://firebase.google.com/docs/database/web/lists-of-data
    const resultFromApi = this.beersPath.child(id);
    resultFromApi.once(FirebaseEvent.value)
      .then((snapshot: firebase.database.DataSnapshot) => {
        let dbBeer = snapshot.val() as Beer;
        super.copyData(entity, dbBeer);
        resultFromApi.set(dbBeer).catch((error) => {
          // console.log("Error while updating beer", error)
        });
      })
      .catch((error) => {
         // console.log("Error while getting beer", error);
      });
  }

  /**
   * Get all beers
   * @returns {Observable<Beer[]>}
   */
  getAll(): Observable<Beer[]> {
    return Observable.fromEvent(this.beersPath, FirebaseEvent.value, (snapshot) => {
      const result = snapshot.val();
      const beers: Beer[] = [];
      Object.keys(result).map((value: string) => {
        beers.push(result[value] as Beer);
      });

      return beers;
    });
  }

  /**
   * Get all beers from a bar
   * @param {string} barId
   * @returns {Observable<BarBeer[]>}
   */
  getAllBarBeersByBarId(barId: string): Observable<BarBeer[]> {
    if(isNullOrUndefined(barId)) throw new Error("barId must be defined");

    return Observable.fromEvent(this.barBeersPath, FirebaseEvent.value, (barBeerSnapshot) => {
      const barBeers: BarBeer[] = [];
      const dbData = barBeerSnapshot.val();
      if(dbData) {
        Object.keys(dbData).map(value => barBeers.push(dbData[value] as BarBeer));
        return barBeers.filter(barBeer => barBeer.bar == barId);
      }
    });
  }

  /**
   * Get all BarBeers from a beer
   * @param {string} beerId
   * @returns {Observable<BarBeer[]>}
   */
  getAllBarBeersByBeerId(beerId: string): Observable<BarBeer[]> {
    if(isNullOrUndefined(beerId)) throw new Error("beerId must be defined");

    return Observable.fromEvent(this.barBeersPath, FirebaseEvent.value, (barBeerSnapshot) => {
      const barBeers: BarBeer[] = [];
      const dbData = barBeerSnapshot.val();
      if(dbData) {
        Object.keys(dbData).map(value => barBeers.push(dbData[value] as BarBeer));
        return barBeers.filter(barBeer => barBeer.beer == beerId);
      }
    });
  }

  /**
   * Get all beers from a brewery
   * @param {string} breweryId
   * @returns {Observable<Beer[]>}
   */
  getAllBeersByBreweryId(breweryId: string): Observable<Beer[]> {
    if(isNullOrUndefined(breweryId)) throw new Error("breweryId must be defined");

    return Observable.fromEvent(this.beersPath, FirebaseEvent.value, (beerSnapshot) => {
      const beers: Beer[] = [];
      const dbData = beerSnapshot.val();
      if(dbData) {
      Object.keys(dbData).map(value => beers.push(dbData[value] as Beer));
      return beers.filter(beer => beer.brewery == breweryId);
      }
    });
  }

  /**
   * Get a beer from an id
   * @param {string} id
   * @returns {Observable<Beer>}
   */
  get(id: string): Observable<Beer> {
    if(isNullOrUndefined(id)) throw new Error("id must be defined");

    return Observable.fromEvent(this.beersPath.child(id), FirebaseEvent.value, (snapshot) => {
      const result = snapshot.val();
      return result as Beer;
    });
  }

  /**
   * Get the ratings of a beer
   * @param {string} beerId
   * @returns {Observable<UserBeerRating[]>}
   */
  getBeerRatingsByBeerId(beerId: string): Observable<UserBeerRating[]> {
    if(isNullOrUndefined(beerId)) throw new Error("beerId must be defined");

    return Observable.fromEvent(this.userBeerRatingsPath, FirebaseEvent.value, (snapshot) => {
      const ratings: UserBeerRating[] = [];
      const dbData = snapshot.val() || [];
      Object.keys(dbData).map(value => ratings.push(dbData[value] as UserBeerRating));
      return ratings.filter(rating =>  rating.beer == beerId);
    });
  }

  /**
   * Add a beer rating
   * @param {UserBeerRating} beerRating
   */
  addBeerRating(beerRating: UserBeerRating) {
    if(isNullOrUndefined(beerRating)) throw new Error("beerRating must be defined");

    const newKey: string = beerRating.user + "_" + beerRating.beer;
    this.userBeerRatingsPath.child(newKey).set(beerRating);
  }

  /**
   * Get drank beer from a user, grouped by date
   * @param {string} userId
   * @returns {Observable<BeerStatistics>}
   */
  getDrankBeersByGroupedByDateByUserId(userId: string): Observable<BeerStatistics> {
    if(isNullOrUndefined(userId)) throw new Error("userId must be defined");

    return Observable.fromEvent(this.userBeerDrankPath, FirebaseEvent.value, (snapshot) => {
      const beers: UserBeer[] = [];
      const dbData = snapshot.val() || [];
      Object.keys(dbData).map(value => beers.push(dbData[value] as UserBeer));
      const resultsByUser: UserBeer[] = beers.filter(rating =>  rating.user == userId) as UserBeer[];
      const beerStatistics = new BeerStatistics();

      beerStatistics.beersDrankByDate = new Map<string, UserBeer[]>();

      const differentBeers = [];

      function groupByDate(result: UserBeer) {
        if(beerStatistics.beersDrankByDate[result.dateDrank] == undefined) {
          beerStatistics.beersDrankByDate[result.dateDrank] = [];
        }
        beerStatistics.beersDrankByDate[result.dateDrank].push(result);
        differentBeers[result.beer] = true;
      }

      function groupByBeer(result: UserBeer) {
        let key: string = result.beer + "_" + result.beerName;
        if(beerStatistics.totalDrankBeersByBeer[key] == undefined) {
          beerStatistics.totalDrankBeersByBeer[key] = 0;
        }
        beerStatistics.totalDrankBeersByBeer[key] += 1;
      }

      resultsByUser.map((result: UserBeer) => {
        groupByDate(result);
        groupByBeer(result);
      });

      beerStatistics.differentBeersTotal = Object.keys(differentBeers).length;

      beerStatistics.totalDrankBeers = resultsByUser ? resultsByUser.length : 0;

      return beerStatistics;
    });
  }

  /**
   * Add a drank beer
   * @param {UserBeer} userBeer
   */
  addBeerDrank(userBeer: UserBeer): void {
    if(isNullOrUndefined(userBeer)) throw new Error("userBeer must be defined");

    this.userBeerDrankPath.push(userBeer);
  }

  /**
   * Update brewery from a beer
   * @param {string} beerId
   * @param {string} breweryId
   */
  addBreweryToBeer(beerId: string, breweryId: string): void {
    if(isNullOrUndefined(beerId)) throw Error("beerId must be defined");
    if(isNullOrUndefined(beerId)) throw Error("breweryId must be defined");

    this.beersPath.child(beerId).set({
      "brewery": breweryId
    });
  }

  /**
   * Remove brewery from a beer
   * @param {string} beerId
   */
  removeBreweryFromBeer(beerId: string): void {
    if(isNullOrUndefined(beerId)) throw new Error("beerId must be defined");

    this.beersPath.child(beerId).child("brewery").remove();
  }

}


