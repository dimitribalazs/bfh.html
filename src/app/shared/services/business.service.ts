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
import {GeoData} from '../dto/geoData';
import {BarBeer} from '../dto/barBeer';
import {Bar, OpenTime} from '../dto/bar';
import {BeerDatabaseService} from '../services/beer.service';
import {BreweryDatabaseService} from '../services/brewery.service'
import {BarDatabaseService} from '../services/bar.service';
import {UserDatabaseService} from '../services/user.service';
import {
  BarModel, BeerModel, BreweryModel, BeerBarModel, Time, DropDownEntry,
  UserModel
} from '../domainModel/viewModels';
import {RatingModel} from '../components/rating/ratingModel';
import {forEach} from '@angular/router/src/utils/collection';
import {isNullOrUndefined} from 'util';
import {UserBarRating} from "../dto/userBarRating";
import {Rating, getRatingDefault} from "../dto/rating";
import {UserBeerRating} from "../dto/userBeerRating";
import {AroundYou} from "../dto/aroundYou";


@Injectable()
export class BusinessService {

  currentUser: UserModel = new UserModel();
  debugMode: boolean;

  subscription: Subscription = new Subscription()

  // subjects
  public barSubject: Subject<BarModel> = new BehaviorSubject<BarModel>(new BarModel());
  private brewerySubject: Subject<BreweryModel> = new BehaviorSubject<BreweryModel>(new BreweryModel());
  private beerSubject: Subject<BeerModel> = new BehaviorSubject<BeerModel>(new BeerModel());
  private userSubject: Subject<UserModel> = new BehaviorSubject<UserModel>(new UserModel());
  private usersSubject: Subject<UserModel[]> = new BehaviorSubject<UserModel[]>(new Array<UserModel>());
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
    this.userSubject.asObservable();


  }

  setCurrentUser(userId: string) {
    this.getUser(userId).subscribe((user) => this.currentUser = user)
  }

  /**
   * Get the beer with the id
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
      this.beerService.getBeerRatingsByBeerId(id).subscribe((ratings: UserBeerRating[]) => {
        beerModel.ratings[0] = 0
        beerModel.ratings[1] = 0
        beerModel.ratings[2] = 0
        ratings.map((rating: UserBeerRating) => {
          if (rating.user === this.currentUser.id) {
            beerModel.userRating = Rating[Rating[rating.rating]];
          }
          beerModel.incrementRating(rating.rating);
        })
      });

      this.breweryService.get(beer.brewery).subscribe((brewery) => beerModel.brewery = this.mapBreweryDtoToDomainModel(brewery));
      // emit the loaded bar data
      this.beerSubject.next(beerModel)
      // reload the available beers
      // TODO: getBarByBeer funktion fehlt
      this.barService.getAll().subscribe((data) => {
        // map dto to viewModel
        // reload the available bars
        this.beerService.getAllBarBeersByBeerId(beer.id).subscribe((barBeers: BarBeer[]) => {
          // map dto to viewModel
          const beersArr: Array<BeerBarModel> = new Array<BeerBarModel>()
          if (barBeers) {
            // beers.forEach((beer: Beer) => beersArr.push(this.mapBeerDtoToDomainModel(beer)))
            Object.keys(barBeers).map((value: string) => {
              const barBeer: BarBeer = barBeers[value] as BarBeer;
              const model = new BeerBarModel();
              model.barName = barBeer.barName;
              model.barId = barBeer.bar;
              model.beerName = barBeer.beerName;
              model.beerId = barBeer.beer;
              model.price = barBeer.price.toString();
              beersArr.push(model);
            });
          }
          // emit the available beers
          beerModel.bars.next(beersArr)

        })
      })
    })
    return this.beerSubject;
  }

  /**
   * add a beer to a bar
   * @param beerId
   * @param barId
   */
  addBeerToBar(barBeerModel: BeerBarModel) {
    console.log('beerId: ' + barBeerModel.beerId + ', barId: ' + barBeerModel.barId)
    const barBeer: BarBeer = {
      price: parseFloat(barBeerModel.price),
      tapOrBottled: barBeerModel.tapOrBottled,
      beerName: barBeerModel.beerName,
      beer: barBeerModel.beerId,
      barName: barBeerModel.barName,
      bar: barBeerModel.barId,
    };
    this.barService.addBeerToBar(barBeer);
  }

  /**
   * remove a beer from the bar
   * @param beerId
   * @param barId
   */
  removeBeerFromBar(beerId: string, barId: string) {
    console.log('beerId: ' + beerId + ', barId: ' + barId);
    const barBeer: BarBeer = new BarBeer();
    barBeer.beer = beerId;
    barBeer.bar = barId;
    this.barService.removeBeerFromBar(barBeer);
  }


  /**
   * add a beer to a bar
   * @param beerId
   * @param beerName
   * @param breweryId
   * @param breweryName
   */
  addBeerToBrewery(beerId: string, beerName: string, breweryId: string, breweryName: string) {
    // TODO

  }

  /**
   * remove a beer from the brewery
   * @param beerId
   * @param breweryId
   */
  removeBeerFromBrewery(beerId: string, breweryId: string) {
    // TODO
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
      this.barService.getBarRatingsByBarId(id).subscribe((ratings: UserBarRating[]) => {
        barModel.ratings[0] = 0
        barModel.ratings[1] = 0
        barModel.ratings[2] = 0
        ratings.map((rating: UserBarRating) => {
          if (rating.user === this.currentUser.id) {
            barModel.userRating = Rating[Rating[rating.rating]];
          }
          barModel.incrementRating(rating.rating);
        })
      });

      // emit the loaded bar data
      this.barSubject.next(barModel)
      // reload the available beers
      this.beerService.getAllBarBeersByBarId(bar.id).subscribe((barBeers: BarBeer[]) => {
        // map dto to viewModel
        const beersArr: Array<BeerBarModel> = new Array<BeerBarModel>()
        // beers.forEach((beer: Beer) => beersArr.push(this.mapBeerDtoToDomainModel(beer)))
        if (barBeers) {
          Object.keys(barBeers).map((value: string) => {
            const barBeer: BarBeer = barBeers[value] as BarBeer;
            const model = new BeerBarModel();
            model.barName = barBeer.barName;
            model.barId = barBeer.bar;
            model.beerName = barBeer.beerName;
            model.beerId = barBeer.beer;
            model.price = barBeer.price.toString();
            beersArr.push(model);
          });
        }
        // emit the available beers
        barModel.beers.next(beersArr);
      })
    })
    return this.barSubject;
  }

  setBarRating(barId: string, userRating: number) {
    const barRating: UserBarRating = {
      user: this.currentUser.id,
      bar: barId,
      rating: userRating
    };

    this.barService.addBarRating(barRating);
  }

  setBeerRating(beerId: string, userRating: number) {
    const beerRating: UserBeerRating = {
      user: this.currentUser.id,
      beer: beerId,
      rating: userRating
    };

    this.beerService.addBeerRating(beerRating);
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
      this.beerService.getAllBeersByBreweryId(id).subscribe((data) => {
        // map dto to viewModel
        const beersArr: Array<BeerModel> = new Array<BeerModel>()
        data.forEach((beer: Beer) => beersArr.push(this.mapBeerDtoToDomainModel(beer)))
        // emit the available beers
        breweryModel.beers.next(beersArr)
      })
    })
    return this.brewerySubject;
  }

  getUser(id: string): Subject<UserModel> {
    // emit the loaded Data
    this.subscription.unsubscribe()
    this.subscription = this.userService.get(id).subscribe((user: User) => {
      // map dto to viewModel
      const userModel: UserModel = this.mapUserDtoToDomainModel(user);
      // emit the loaded bar data
      this.userSubject.next(userModel)
      // reload the favoriteBeers beers
      this.userService.getFavoriteBeersOfUser(userModel.id).subscribe((data) => {
        // map dto to viewModel
        const beerArr: Array<BeerModel> = new Array<BeerModel>()
        data.forEach((beer: Beer) => beerArr.push(this.mapBeerDtoToDomainModel(beer)))
        // emit the available beers
        userModel.favoriteBeers.next(beerArr)
      })

      this.userService.getFriendsOfUser(userModel.id).subscribe((data) => {
        // map dto to viewModel
        const friendsArr: Array<UserModel> = new Array<UserModel>()
        data.forEach((friends: User) => friendsArr.push(this.mapUserDtoToDomainModel(friends)))
        // emit the available beers
        userModel.friends.next(friendsArr)
      })
    })
    return this.userSubject;
  }

  /**
   * Get all user
   * @param id
   * @returns {Subject<UserModel[]>}
   */
  getAllUser(): Subject<UserModel[]> {
    // emit the loaded Data
    this.subscription.unsubscribe()
    this.subscription = this.userService.getAll().subscribe((users) => {
      const usersViewModel: Array<UserModel> = new Array()
      Object.keys(users).map(value => usersViewModel.push(this.mapUserDtoToDomainModel(users[value] as User)));
      this.usersSubject.next(usersViewModel);
    })
    return this.usersSubject;
  }

  private mapBarDtoToDomainModel(dto: Bar): BarModel {
    const model = new BarModel();
    model.id = dto.id;
    model.name = dto.name;
    model.address = dto.address;
    model.city = dto.city;
    model.plz = dto.plz;
    model.userRating = getRatingDefault();
    model.ratings[0] = 0;
    model.ratings[1] = 0;
    model.ratings[2] = 0;
    model.size = dto.size;
    model.isSmokingAllowed = dto.isSmokingAllowed;

    model.snacks = dto.snacks;
    if (isNullOrUndefined(dto.image)) {
      model.image = 'assets/bars/Default.jpg';
    }else {
      model.image = dto.image;
    }
    model.location = dto.location;
    model.description = dto.description;

    const ArrayOpen: Array<Time> = new Array(7)
    const ArrayClose: Array<Time> = new Array(7)

    if (isNullOrUndefined(dto.openingHours)) {
      for (let i = 0; i < 7; i++) {
        model.openingHours[i] = 'Opening hours unknown'
      }
    } else {
      for (let i = 0; i < 7; i++) {
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


  private mapUserDtoToDomainModel(dto: User): UserModel {
    const model = new UserModel();
    model.id = dto.id;
    model.firstname = dto.firstname;
    model.lastname = dto.lastname;
    if (isNullOrUndefined(dto.image)) {
      model.image = 'assets/users/Default.jpg';
    }else {
      model.image = dto.image;
    }
    model.registrationDate = dto.registrationDate;
    model.totalConsumption = dto.totalConsumption;
    model.address = dto.address;
    model.city = dto.city;
    model.tel = dto.tel;
    model.badge = dto.badge;
    model.dateOfBirth = dto.dateOfBirth;
    model.location = isNullOrUndefined(dto.location) ? model.location = new GeoData() : model.location = dto.location;
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
    model.userRating = getRatingDefault();
    model.ratings[0] = 0;
    model.ratings[1] = 0;
    model.ratings[2] = 0;
    if (isNullOrUndefined(dto.image)) {
      model.image = 'assets/logos/Default.jpg';
    }else {
      model.image = dto.image;
    }
    model.taste = dto.taste;
    model.location = isNullOrUndefined(dto.location) ? model.location = new GeoData() : model.location = dto.location;
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
    dto.brewery = model.brewery.id
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
