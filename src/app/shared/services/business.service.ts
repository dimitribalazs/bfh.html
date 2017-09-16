/**
 * Created by STRI on 14.09.2017.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {Beer} from '../dto/beer';
import {Brewery} from '../dto/brewery';
import {User} from '../dto/user';
import {Bar} from '../dto/bar';
import {BeerDatabaseService} from '../services/beer.service';
import {BreweryDatabaseService} from '../services/brewery.service'
import {BarDatabaseService} from '../services/bar.service';
import {UserDatabaseService} from '../services/user.service';
import {BarModel, BeerModel, BreweryModel, BeerBarModel, Time} from '../domainModel/viewModels';
import {RatingModel} from '../components/rating/ratingModel';
import {forEach} from "@angular/router/src/utils/collection";
import {isNullOrUndefined} from "util";


@Injectable()
export class BusinessService {

  // TODO Login
  currentUser = 1;
  debugMode: boolean = true

  subscription: Subscription = new Subscription()

  //subjects
  public barSubject: Subject<BarModel> = new BehaviorSubject<BarModel>(new BarModel());
  private brewerySubject: Subject<BreweryModel> = new BehaviorSubject<BreweryModel>(new BreweryModel());
  // public barAvailableBeersSubject: Subject<BeerModel[]> = new BehaviorSubject<BeerModel[]>(new Array<BeerModel>());
  // public barsSubject: Subject<BarModel[]> = new BehaviorSubject<BarModel[]>(this.bars);

  constructor(private beerService: BeerDatabaseService,
              private breweryService: BreweryDatabaseService,
              private barService: BarDatabaseService,
              private userService: UserDatabaseService) {
    this.barSubject.asObservable();
    this.brewerySubject.asObservable();
  }

  // load a bar with id
  getBar(id: string): Subject<BarModel> {
    // emit the loaded Data
    this.subscription = this.barService.get(id).subscribe((bar: Bar) => {
      // map dto to viewModel
      const barModel = this.mapBarDtoToDomainModel(bar);
      // load the userrating
      // TODO laden von DB (funktion fehlt)
      barModel.userRating = 0;
      // emit the loaded bar data
      this.barSubject.next(barModel)
      // reload the available beers
      this.beerService.getAllBeersByBarId(bar.id).subscribe((beers) => {
        // map dto to viewModel
        const beersArr: Array<BeerBarModel> = new Array<BeerBarModel>()
        // beers.forEach((beer: Beer) => beersArr.push(this.mapBeerDtoToDomainModel(beer)))

        // nur für funktionstest. Wenn getAllBeersByBarId funktioniert wieder löschen
        const test: BeerBarModel = new BeerBarModel();
        test.beerId = '1'
        test.beerName = 'Feldschlösschen';
        test.price = '5.5 fr.';
        beersArr.push(test);

        // emit the available beers
        barModel.beers.next(beersArr)

      })
    })
    return this.barSubject;
  }

  setBarRating(ratingBad: number, ratingOk: number, ratingGreat: number, userRating: number) {
    // TODO speichern in DB

  }

  getBrewery(id: string): Subject<BreweryModel> {
    // emit the loaded Data
    this.subscription.unsubscribe()
    this.subscription = this.breweryService.get(id).subscribe((brewery: Brewery) => {
      // map dto to viewModel
      const breweryModel: BreweryModel = this.mapBreweryDtoToDomainModel(brewery);
      // emit the loaded bar data
      this.brewerySubject.next(breweryModel)
      // reload the available beers
      // TODO: getBeerByBrewery funktion fehlt
      this.beerService.getAll().subscribe((data) => {
        // map dto to viewModel
        const beersArr: Array<BeerModel> = new Array<BeerModel>()
        data.forEach((beer: Beer) => beersArr.push(this.mapBeerDtoToDomainModel(beer)))

        // nur für funktionstest. Wenn getAllBeersByBarId funktioniert wieder löschen
        const test: BeerModel = new BeerModel();
        test.name = 'Nur ein test... wieder löschen!!!';
        beersArr.push(test);

        // emit the available beers
        breweryModel.beers.next(beersArr)
      })
    })
    return this.brewerySubject;
  }

  private mapBarDtoToDomainModel(dto: Bar): BarModel {
    const model = new BarModel();
    model.id = dto.id;
    model.name = dto.name;
    model.address = dto.address;
    model.city = dto.city;
    model.plz = dto.plz;
    // TODO laden von dto
    // barModel.rating[0] = barDto.rating;
    // barModel.rating[1] = barDto.rating;
    // barModel.rating[2] = barDto.rating;
    model.ratings[0] = 0;
    model.ratings[1] = 0;
    model.ratings[2] = 0;
    model.size = dto.size;
    model.isSmokingAllowed = dto.isSmokingAllowed;
    model.openingHours = dto.openingHours;
    model.snacks = dto.snacks;
    model.image = dto.image;
    model.location = dto.location;
    model.description = dto.description;
    // barModel.beers = new Array();

    const ArrayOpen: Array<Time> = new Array()
    const ArrayClose: Array<Time> = new Array()

    ArrayOpen[6] = new Time
    ArrayOpen[6].houre = 7;
    ArrayOpen[6].min = 7;
    ArrayOpen[6].sec = 0;

    ArrayClose[6] = new Time
    ArrayClose[6].houre = 25;
    ArrayClose[6].min = 30;
    ArrayClose[6].sec = 0;

    // TODO set barModel.openNowText
    const currentTime = new Date()
    currentTime.setHours(25)
    if (!isNullOrUndefined(ArrayOpen[currentTime.getDay()]) && !isNullOrUndefined(ArrayClose[currentTime.getDay()])) {
      const openFrom = new Date();
      openFrom.setHours(ArrayOpen[6].houre, ArrayOpen[6].min, ArrayOpen[6].sec)

      const openTo = new Date();
      openTo.setHours(ArrayClose[6].houre, ArrayClose[6].min, ArrayClose[6].sec)


      if (currentTime > openFrom && currentTime < openTo) {
        console.log('******** Open now')
      }else {
        console.log('******** Cloesed now: ' + currentTime)
      }
    }else {
      console.log('******** Cloesed now: ' + currentTime)
    }

    if (this.debugMode) {
      console.log('mapBeerDtoToDomainModel')
      console.log('dto:')
      console.log(dto)
      console.log('viewModel:')
      console.log(model)
    }

    return model;
  }


  private mapBeerDtoToDomainModel(dto: Beer): BeerModel {
    const model = new BeerModel();
    model.id = dto.id;
    model.name = dto.name;
    model.description = dto.description;
    model.volume = dto.volume;
    model.brewType = dto.brewType;
    model.rating = dto.rating;
    model.brewery = dto.brewery;
    model.bars = new Array<BarModel>();
    model.image = dto.image;
    model.taste = dto.taste;
    model.location = dto.location;
    if (this.debugMode) {
      console.log('mapBeerDtoToDomainModel')
      console.log('dto:')
      console.log(dto)
      console.log('viewModel:')
      console.log(model)
    }
    return model;
  }

  private mapBreweryDtoToDomainModel(dto: Brewery): BreweryModel {
    const model = new BreweryModel();
    model.id = dto.id;
    model.name = dto.name;
    model.address = dto.address;
    model.city = dto.city;
    model.country = dto.country;
    model.email = dto.email;
    model.homepage = dto.homepage;
    model.tel = dto.tel;
    model.geoLocation = dto.geoLocation;
    model.description = dto.description;
    model.image = dto.image;
    if (this.debugMode) {
      console.log('mapBeerDtoToDomainModel')
      console.log('dto:')
      console.log(dto)
      console.log('viewModel:')
      console.log(model)
    }
    return model;
  }

}
