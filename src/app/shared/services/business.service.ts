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
import {Bar, OpenTime} from '../dto/bar';
import {BeerDatabaseService} from '../services/beer.service';
import {BreweryDatabaseService} from '../services/brewery.service'
import {BarDatabaseService} from '../services/bar.service';
import {UserDatabaseService} from '../services/user.service';
import {BarModel, BeerModel, BreweryModel, BeerBarModel, Time, DropDownEntry} from '../domainModel/viewModels';
import {RatingModel} from '../components/rating/ratingModel';
import {forEach} from '@angular/router/src/utils/collection';
import {isNullOrUndefined} from 'util';
import {GeoData} from "../dto/geoData";
import {BarBeer} from "../dto/barBeer";


@Injectable()
export class BusinessService {

  // TODO Login
  currentUser = 1;
  debugMode: boolean;

  subscription: Subscription = new Subscription()

  // subjects
  public barSubject: Subject<BarModel> = new BehaviorSubject<BarModel>(new BarModel());
  private brewerySubject: Subject<BreweryModel> = new BehaviorSubject<BreweryModel>(new BreweryModel());
  private beerSubject: Subject<BeerModel> = new BehaviorSubject<BeerModel>(new BeerModel());
  // public barAvailableBeersSubject: Subject<BeerModel[]> = new BehaviorSubject<BeerModel[]>(new Array<BeerModel>());
  // public barsSubject: Subject<BarModel[]> = new BehaviorSubject<BarModel[]>(this.bars);

  constructor(private beerService: BeerDatabaseService,
              private breweryService: BreweryDatabaseService,
              private barService: BarDatabaseService,
              private userService: UserDatabaseService) {
    this.debugMode = true;
    this.beerSubject.asObservable();
    this.barSubject.asObservable();
    this.brewerySubject.asObservable();
  }

  /**
   * get the beer with the id
   * @param id the id of the beer
   * @returns {Subject<BeerModel>} A beer subject
   */
  getBeer(id: string): Subject<BeerModel> {
    // emit the loaded Data
    this.subscription.unsubscribe()
    this.subscription = this.beerService.get(id).subscribe((beer: Beer) => {
      // map dto to viewModel
      const beerModel: BeerModel = this.mapBeerDtoToDomainModel(beer);
      // load the userrating
      // TODO laden von DB (funktion fehlt)
      beerModel.userRating = 0;
      // emit the loaded bar data
      this.beerSubject.next(beerModel)
      // reload the available beers
      // TODO: getBarByBeer funktion fehlt
      this.barService.getAll().subscribe((data) => {
        // map dto to viewModel
        const beersArr: Array<BeerBarModel> = new Array<BeerBarModel>()
        // beers.forEach((beer: Beer) => beersArr.push(this.mapBeerDtoToDomainModel(beer)))



        // nur für funktionstest. Wenn getAllBeersByBarId funktioniert wieder löschen
        const test: BeerBarModel = new BeerBarModel();
        test.barId = '1'
        test.barName = 'Barbièr';
        beersArr.push(test);

        // emit the available beers
        beerModel.bars.next(beersArr)
      })
    })
    return this.beerSubject;
  }

  /**
   * create or update a beer
   * @param beer the beer
   * @returns {string} the id of the beer
   */
  createOrUpdateBeer(beer: BeerModel): string {
    if (isNullOrUndefined(beer.id)) {
      beer.id = this.beerService.create(this.mapBeerDomainModeltoDto(beer))
    } else {
      this.beerService.update(beer.id, this.mapBeerDomainModeltoDto(beer));
    }
    return beer.id;
  }

  /**
   * load a bar with id
   * @param id the id of the bar
   * @returns {Subject<BarModel>} A bar subject
   */
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
      this.beerService.getAllBarBeersByBarId(bar.id).subscribe((barBeers: BarBeer[]) => {
        // map dto to viewModel
        const beersArr: Array<BeerBarModel> = new Array<BeerBarModel>()
        // beers.forEach((beer: Beer) => beersArr.push(this.mapBeerDtoToDomainModel(beer)))
        Object.keys(barBeers).map((value: string) => {
          const barBeer: BarBeer = barBeers[value] as BarBeer;
          const model  = new BeerBarModel();
          model.barName = barBeer.barName;
          model.barId = barBeer.bar;
          model.beerName = barBeer.beerName;
          model.beerId = barBeer.beer;
          model.price = barBeer.price.toString();
          beersArr.push(model);
        });

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

    model.snacks = dto.snacks;
    model.image = dto.image;
    model.location = dto.location;
    model.description = dto.description;

    const ArrayOpen: Array<Time> = new Array(7)
    const ArrayClose: Array<Time> = new Array(7)

    for (let i = 0 ; i < 7; i++) {
      model.openingHours[i] = 'Cloesed'
    }

    dto.openingHours.forEach((day) => {
      ArrayOpen[day.day] = new Time
      ArrayOpen[day.day].houre = day.openHoure;
      ArrayOpen[day.day].min = day.openMin;
      ArrayOpen[day.day].sec = day.openSec;

      ArrayClose[day.day] = new Time
      ArrayClose[day.day].houre = day.closeHoure;
      ArrayClose[day.day].min = day.closeMin;
      ArrayClose[day.day].sec = day.closeSec;
      day.closeHoure = day.closeHoure >= 24 ? day.closeHoure - 24 : day.closeHoure
      model.openingHours[day.day] = day.openHoure + ':' + day.openMin + ' - ' + day.closeHoure + ':' + day.closeMin
    })

    const currentTime = new Date()
    model.openNowText = 'Cloesed now'
    if (!isNullOrUndefined(ArrayOpen[currentTime.getDay()]) && !isNullOrUndefined(ArrayClose[currentTime.getDay()])) {
      const openFrom = new Date();
      openFrom.setHours(ArrayOpen[currentTime.getDay()].houre, ArrayOpen[currentTime.getDay()].min, ArrayOpen[currentTime.getDay()].sec)

      const openTo = new Date();
      openTo.setHours(ArrayClose[currentTime.getDay()].houre, ArrayClose[currentTime.getDay()].min, ArrayClose[currentTime.getDay()].sec)

      if (currentTime > openFrom && currentTime < openTo) {
        model.openNowText = 'Open now'
      }
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
    // TODO laden von dto
    // barModel.rating[0] = barDto.rating;
    // barModel.rating[1] = barDto.rating;
    // barModel.rating[2] = barDto.rating;
    model.ratings[0] = 0;
    model.ratings[1] = 0;
    model.ratings[2] = 0;
    model.image = dto.image;
    model.taste = dto.taste;
    model.location = isNullOrUndefined(dto.location) ? model.location =  new GeoData() : model.location = dto.location ;
    if (this.debugMode) {
      console.log('mapBeerDtoToDomainModel')
      console.log('dto:')
      console.log(dto)
      console.log('viewModel:')
      console.log(model)
    }
    return model;
  }

  /**
   * map the beer domain model to a beer dto
   * @param model
   * @returns {Beer} dto
   */
  private mapBeerDomainModeltoDto(model: BeerModel): Beer {
    const dto = new Beer();
    dto.id = model.id;
    dto.name = model.name;
    dto.description = model.description;
    dto.volume = model.volume;
    dto.brewType = new Array<DropDownEntry>();
    dto.brewType = model.brewType;
    // TODO save in db
    // dto.ratings[] = model.ratings[];
    dto.image = model.image;
    dto.taste = new Array<DropDownEntry>();
    dto.taste = model.taste;
    dto.location = model.location;
    if (this.debugMode) {
      console.log('mapBeerDtoToDomainModel')
      console.log('dto:')
      console.log(dto)
      console.log('viewModel:')
      console.log(model)
    }
    return dto;
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
