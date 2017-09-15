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
import {BarModel, BeerModel, BreweryModel} from '../domainModel/viewModels';
import {forEach} from "@angular/router/src/utils/collection";


@Injectable()
export class BusinessService {

  subscription: Subscription = new Subscription()

  //subjects
  public barSubject: Subject<BarModel> = new BehaviorSubject<BarModel>(new BarModel());
  // public barAvailableBeersSubject: Subject<BeerModel[]> = new BehaviorSubject<BeerModel[]>(new Array<BeerModel>());
  // public barsSubject: Subject<BarModel[]> = new BehaviorSubject<BarModel[]>(this.bars);

  constructor(private beerService: BeerDatabaseService,
              private breweryService: BreweryDatabaseService,
              private barService: BarDatabaseService,
              private userService: UserDatabaseService) {
    this.barSubject.asObservable();
  }


  getBar(id: string): Subject<BarModel> {
    // emit the loaded Data
    this.subscription = this.barService.get(id).subscribe((bar: Bar) => {
      // map dto to viewModel
      const barModel = this.mapBarDtoToDomainModel(bar);
      // emit the loaded bar data
      this.barSubject.next(barModel)
      // reload the available beers
      this.beerService.getAllBeersByBarId(bar.id).subscribe((beers) => {
        // map dto to viewModel
        const beersArr: Array<BeerModel> = new Array<BeerModel>()
        beers.forEach((beer: Beer) => beersArr.push(this.mapBeerDtoToDomainModel(beer)))

        // nur für funktionstest. Wenn getAllBeersByBarId funktioniert wieder löschen
        const test: BeerModel = new BeerModel();
        test.name = 'Nur ein test... wieder löschen!!!';
        beersArr.push(test);

        // emit the available beers
        barModel.beers.next(beersArr)

      })
    })
    return this.barSubject;
  }


  private mapBarDtoToDomainModel(barDto: Bar): BarModel {
    const barModel = new BarModel();
    barModel.id = barDto.id;
    barModel.name = barDto.name;
    barModel.address = barDto.address;
    barModel.city = barDto.city;
    barModel.plz = barDto.plz;
    barModel.rating = barDto.rating;
    barModel.size = barDto.size;
    barModel.isSmokingAllowed = barDto.isSmokingAllowed;
    barModel.openingHours = barDto.openingHours;
    barModel.snacks = barDto.snacks;
    barModel.image = barDto.image;
    barModel.location = barDto.location;
    barModel.description = barDto.description;
    // barModel.beers = new Array();
    return barModel;
  }

  private mapBeerDtoToDomainModel(beerDto: Beer): BeerModel {
    const beerModel = new BeerModel();
    beerModel.id = beerDto.id;
    beerModel.name = beerDto.name;
    beerModel.description = beerDto.description;
    beerModel.volume = beerDto.volume;
    beerModel.brewType = beerDto.brewType;
    beerModel.rating = beerDto.rating;
    beerModel.brewery = beerDto.brewery;
    beerModel.bars = new Array<BarModel>();
    beerModel.image = beerDto.image;
    beerModel.taste = beerDto.taste;
    beerModel.location = beerDto.location;
    return beerModel;
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
    return model;
  }

}
