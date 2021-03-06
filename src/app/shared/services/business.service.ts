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
import {Bar} from '../dto/bar';
import {BeerDatabaseService} from '../services/beer.service';
import {BreweryDatabaseService} from '../services/brewery.service'
import {BarDatabaseService} from '../services/bar.service';
import {UserDatabaseService} from '../services/user.service';
import {
  Badge,
  BarModel,
  BeerBarModel,
  BeerModel,
  BeerTotalStatistics,
  BreweryModel,
  DropDownEntry,
  Time,
  UserModel
} from '../domainModel/viewModels';
import {isNullOrUndefined} from 'util';
import {UserBarRating} from '../dto/userBarRating';
import {getRatingDefault, Rating} from '../dto/rating';
import {UserBeerRating} from '../dto/userBeerRating';
import {AroundYou} from '../domainModel/aroundYou';
import {UserBeer} from '../dto/userBeer';
import {UserBar} from '../dto/userBar';
import {BeerStatistics} from '../dto/beerStatistics';
import {BarStatistics} from '../dto/barStatistics';
import {BadgeType} from '../domainModel/badgeType';
import {GeoService} from '../services/geo.service';

export enum BarState {
  UNDEFINED = 'Hours',
  OPEN_TEXT_SMALL = 'Open',
  OPEN_TEXT_LARGE = 'Open now',
  CLOSED_TEXT_SMALL = 'Closed',
  CLOSED_TEXT_LARGE = 'Closed now'
}

@Injectable()
export class BusinessService {
  barState = BarState;
  currentUser: UserModel = new UserModel();
  debugMode: boolean;
  appError: any;

  subscription: Subscription = new Subscription()

  // subjects
  public barSubject: Subject<BarModel> = new BehaviorSubject<BarModel>(new BarModel());
  private brewerySubject: Subject<BreweryModel> = new BehaviorSubject<BreweryModel>(new BreweryModel());
  private beerSubject: Subject<BeerModel> = new BehaviorSubject<BeerModel>(new BeerModel());
  private userSubject: Subject<UserModel> = new BehaviorSubject<UserModel>(new UserModel());
  private usersSubject: Subject<UserModel[]> = new BehaviorSubject<UserModel[]>(new Array<UserModel>());
  private aroundYouSubject: Subject<AroundYou[]> = new BehaviorSubject<AroundYou[]>([]);
  public userTopBeersSubject: Subject<Array<BeerModel>> = new BehaviorSubject<Array<BeerModel>>(new Array<BeerModel>());
  public mostBeerSubject: Subject<Array<BeerModel>> = new BehaviorSubject<Array<BeerModel>>(new Array<BeerModel>());
  public popularBeerSubject: Subject<Array<BeerModel>> = new BehaviorSubject<Array<BeerModel>>(new Array<BeerModel>());

  public positionSubject: Subject<GeoData> = new BehaviorSubject<GeoData>(new GeoData())

  constructor(private beerService: BeerDatabaseService,
              private breweryService: BreweryDatabaseService,
              private barService: BarDatabaseService,
              private userService: UserDatabaseService,
              private geoService: GeoService) {
    this.debugMode = false;
    this.beerSubject.asObservable();
    this.barSubject.asObservable();
    this.brewerySubject.asObservable();
    this.userSubject.asObservable();
    this.topBeer();

    this.geoService.getCurrentPosition().subscribe(data => {
    });

    setInterval(() => {
      this.geoService.setCurrentPosition()
    }, 120000);

    geoService.positionSubject.subscribe((pos: GeoData) => {
      if (!isNullOrUndefined(pos.longitude) && !isNullOrUndefined(pos.latitude)) {
        this.currentUser.location.latitude = pos.latitude
        this.currentUser.location.longitude = pos.longitude;
        this.updateUser(this.currentUser)
        this.positionSubject.next(pos);
      }
    });
  }

  /**
   * Get the beer with the id
   *
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

      if (!isNullOrUndefined(beer.brewery) && beer.brewery.toString().length > 0) {
        this.breweryService.get(beer.brewery).subscribe((brewery) => beerModel.brewery = this.mapBreweryDtoToDomainModel(brewery));
      }
      // emit the loaded bar data
      this.beerSubject.next(beerModel)
      // reload the available bars
      this.beerService.getAllBarBeersByBeerId(beer.id).subscribe((barBeers: BarBeer[]) => {
        // map dto to viewModel
        const beersArr: Array<BeerBarModel> = new Array<BeerBarModel>()
        if (barBeers) {
          // beers.forEach((beer: Beer) => beersArr.push(this.mapBeerDtoToDomainModel(beer)))
          Object.keys(barBeers).map((value: string) => {
            const barBeer: BarBeer = barBeers[value] as BarBeer;
            beersArr.push(this.mapBarBeerDtoToDomainModel(barBeer));
          });
        }
        // emit the available beers
        beerModel.bars.next(beersArr)

      })
    })

    return this.beerSubject;
  }

  /**
   * Drink a beer
   *
   * @param beerId the beer ID which is drank
   * @param beerName the name of the beer
   */
  public addBeerDrank(beerId: string, beerName: string) {

    const beerDrank: UserBeer = {
      beer: beerId,
      beerName: beerName,
      user: this.currentUser.id,
      dateDrank: new Date().toDateString()
    };

    this.beerService.addBeerDrank(beerDrank);
  }

  /**
   * Visit a bar
   *
   * @param barId the bar ID which is visit
   */
  public addBarVisited(barId: string) {

    const barVisited: UserBar = {
      bar: barId,
      user: this.currentUser.id,
      dateVisited: new Date().toDateString()
    };
    this.barService.addBarVisited(barVisited)
  }

  /**
   * Add a beer to a bar
   *
   * @param beerId
   * @param barId
   */
  addBeerToBar(barBeerModel: BeerBarModel) {
    // console.log('beerId: ' + barBeerModel.beerId + ', barId: ' + barBeerModel.barId)
    const barBeer: BarBeer = {
      price: parseFloat(barBeerModel.price),
      servingStyle: barBeerModel.servingStyle,
      beerName: barBeerModel.beerName,
      beer: barBeerModel.beerId,
      barName: barBeerModel.barName,
      bar: barBeerModel.barId,
    };
    this.barService.addBeerToBar(barBeer);
  }

  /**
   * Remove a beer from the bar
   *
   * @param beerId
   * @param barId
   */
  removeBeerFromBar(beerId: string, barId: string) {
    // console.log('beerId: ' + beerId + ', barId: ' + barId);
    const barBeer: BarBeer = new BarBeer();
    barBeer.beer = beerId;
    barBeer.bar = barId;
    this.barService.removeBeerFromBar(barBeer);
  }

  /**
   * Add brewery to beer
   *
   * @param {string} beerId
   * @param {string} breweryId
   */
  addBreweryToBeer(beerId: string, breweryId: string) {
    this.beerService.addBreweryToBeer(beerId, breweryId);
  }

  /**
   * Remove a beer from the brewery
   *
   * @param beerId
   */
  removeBreweryFromBeer(beerId: string) {
    this.beerService.removeBreweryFromBeer(beerId);
  }

  /**
   * Create or update a beer
   *
   * @param beer the beer
   * @returns {string} the id of the beer
   */
  createOrUpdateBeer(beer: BeerModel): string {
    if (isNullOrUndefined(beer.id) || beer.id.length === 0) {
      beer.owner = this.currentUser.id
      beer.id = this.beerService.create(this.mapBeerDomainModeltoDto(beer))
    } else {
      this.beerService.update(beer.id, this.mapBeerDomainModeltoDto(beer));
    }
    return beer.id;
  }

  /**
   * Load a bar with id
   *
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
            beersArr.push(this.mapBarBeerDtoToDomainModel(barBeer));
          });
        }
        // emit the available beers
        barModel.beers.next(beersArr);
      })
    })
    return this.barSubject;
  }

  /**
   * Indicated the currently logged in user can edit a given beer
   *
   * @param beer which is to be changed
   * @returns {boolean} true if allowed
   */
  public canBeerEdit(beer: BeerModel): boolean {
    return (this.currentUser.administrator || beer.owner === this.currentUser.id)
  }

  /**
   * Set the bar rating
   * @param barId
   * @param userRating
   */
  setBarRating(barId: string, userRating: number) {
    const barRating: UserBarRating = {
      user: this.currentUser.id,
      bar: barId,
      rating: userRating
    };

    this.barService.addBarRating(barRating);
  }

  /**
   * Rates a given beer with a given rating
   *
   * @param {string} beerId
   * @param {number} userRating
   */
  setBeerRating(beerId: string, userRating: number) {
    const beerRating: UserBeerRating = {
      user: this.currentUser.id,
      beer: beerId,
      rating: userRating
    };

    this.beerService.addBeerRating(beerRating);
  }

  /**
   * Returns a reference to a brewery
   *
   * @param {string} id
   * @returns {Subject<BreweryModel>}
   */
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
        breweryModel.beers.next(beersArr);
      })
    })
    return this.brewerySubject;
  }

  /**
   * Sets the currently logged in user
   *
   * @param {string} userId
   */
  setCurrentUser(userId: string) {
    this.userService.get(userId).subscribe((user: User) => {
        // map dto to viewModel
        const userModel: UserModel = this.mapUserDtoToDomainModel(user);
        this.currentUser = userModel
        this.geoService.setCurrentPosition()
      }
    )
  }

  /**
   * Update positon
   */
  updatePosition() {
    this.geoService.setCurrentPosition()
  }

  /**
   * Updates a given user with new data
   *
   * @param {UserModel} user
   */
  updateUser(user: UserModel) {
    this.userService.update(user.id, this.mapUserDomainModelToDto(user))
  }

  getUser(id: string): Subject<UserModel> {
    // emit the loaded Data
    this.subscription.unsubscribe()
    this.subscription = this.userService.get(id).subscribe((user: User) => {
      // map dto to viewModel
      const userModel: UserModel = this.mapUserDtoToDomainModel(user);
      // emit the loaded bar data
      this.userSubject.next(userModel);
      // reload the favoriteBeers beers
      this.userService.getFavoriteBeersOfUser(userModel.id).subscribe((favorites) => {
        const beerArr: Array<BeerModel> = new Array<BeerModel>()
        this.beerService.getAll().subscribe((beers: Beer[]) => {
          beers.map((beer: Beer) => {
            favorites.map((favorite) => {
              if (beer.id === favorite.beerId) {

                beerArr.push(this.mapBeerDtoToDomainModel(beer));
                //favorite.forEach((beer: Beer) => beerArr.push(this.mapBeerDtoToDomainModel(beer)))
                // emit the available beers
              }
            })
          })
        })
        userModel.favoriteBeers.next(beerArr);
      });

      this.beerService.getDrankBeersByGroupedByDateByUserId(userModel.id).subscribe((data: BeerStatistics) => {
        userModel.totalConsumption = data.totalDrankBeers;
        userModel.totalConsumptionPerBeer = this.getBeerConsumption(data);
        userModel.badges = [].concat(...userModel.badges, this.getBeerBadges(data));
      });

      this.barService.getVisitedBarsGroupedByDateByUserId(userModel.id).subscribe((data: BarStatistics) => {
        userModel.badges = [].concat(...userModel.badges, this.getBarBadges(data));
      });

      this.userService.getFriendsOfUser(userModel.id).subscribe((data) => {
        console.log("friends", data);
        // map dto to viewModel
        const friendsArr: Array<UserModel> = new Array<UserModel>()
        data.forEach((friends: any) => {
          const friendModel: UserModel = new UserModel();
          friendModel.id = friends.friend;
          friendModel.firstname = friends.firstname;
          friendModel.lastname = friends.lastname;
          friendsArr.push(friendModel)
        })
        // emit the available beers
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

  /**
   * Returns data used in the AroundYou control on the main page
   *
   * @returns {Subject<AroundYou[]>}
   */
  getAroundYou(): Subject<AroundYou[]> {
    let userObs = Observable.create((observer) => {
      this.userService.getAll().subscribe((users: User[] = []) => {
        let aroundYous: AroundYou[] = [];
        users.map((user: User) => {
          if (user.id != this.currentUser.id && isNullOrUndefined(user.location) == false) {
            let distance = this.geoService.getDistance(this.currentUser.location, user.location);
            if (this.geoService.isInAroundYouRange(distance) && user.id !== this.currentUser.id) {
              let aroundYou: AroundYou = {
                name: `${user.firstname} ${user.lastname}`,
                id: user.id,
                distance: this.formattingDistance(distance),
                routerNavigate: "/user/",
                icon: "fa fa-user",
                unit: "Km"
              };
              aroundYous.push(aroundYou);
            }
          }
        });
        observer.next(aroundYous);
      })
    });
    let barObs = Observable.create((observer) => {
      this.barService.getAll().subscribe((bars: Bar[] = []) => {
        let aroundYous: AroundYou[] = [];
        bars.map((bar: Bar) => {
          if (isNullOrUndefined(bar.location) == false) {
            let distance = this.geoService.getDistance(this.currentUser.location, bar.location);
            if (this.geoService.isInAroundYouRange(distance)) {
              let aroundYou: AroundYou = {
                name: bar.name,
                id: bar.id,
                distance: this.formattingDistance(distance),
                icon: "fa fa-cutlery",
                routerNavigate: "/bar/",
                unit: "Km"
              };
              aroundYous.push(aroundYou);
            }
          }
        });
        observer.next(aroundYous);
      })
    });

    let breweryObs = Observable.create((observer) => {
      this.breweryService.getAll().subscribe((breweries: Brewery[] = []) => {
        let aroundYous: AroundYou[] = [];
        breweries.map((brewery: Brewery) => {
          if (isNullOrUndefined(brewery.location) == false) {
            let distance = this.geoService.getDistance(this.currentUser.location, brewery.location);
            if (this.geoService.isInAroundYouRange(distance)) {
              let aroundYou: AroundYou = {
                name: brewery.name,
                id: brewery.id,
                distance: this.formattingDistance(distance),
                icon: "fa fa-industry",
                routerNavigate: "/brewery/",
                unit: "Km"
              };
              aroundYous.push(aroundYou);
            }
          }
        });
        observer.next(aroundYous);
      })
    });

    Observable.zip(
      userObs,
      barObs,
      breweryObs,
      (users: AroundYou[], bars: AroundYou[], breweries: AroundYou[]) => {
        let flatData = [].concat(...users, ...bars, ...breweries);
        flatData.sort((a: AroundYou, b: AroundYou) => a.distance - b.distance)
        this.aroundYouSubject.next(flatData);
      }).subscribe();

    return this.aroundYouSubject;
  }

  /**
   * Formatting helper for distance information
   *
   * @param {number} distance
   * @returns {number}
   */
  private formattingDistance(distance: number): number {
    const distFix: number = +distance.toFixed(3)
    return distance > 100 ? +distFix.toPrecision(4) : +distFix.toPrecision(3)
  }

  /**
   * load the top beers
   *
   * @returns {Subject<BeerModel>}
   */
  public topBeer() {
    const beerList: Array<BeerModel> = new Array()
    this.beerService.getAll().subscribe((beers) => {
      beers.map((beer) => beerList.push(this.mapBeerDtoToDomainModel(beer)));
      this.mostBeerSubject.next(beerList);
      this.popularBeerSubject.next(beerList);
    });
    const top10: Array<BeerModel> = new Array();
    this.userService.getFavoriteBeersOfUser(this.currentUser.id).subscribe((favorites) => {
      favorites.map((favorite) => {
        this.beerService.getAll().subscribe(beers => {
          beers.map(beer => {
            if (beer.id === favorite.beerId) {
              top10.push(this.mapBeerDtoToDomainModel(beer))
            }
          })
        })
      });
      this.userTopBeersSubject.next(top10);
    });
  }

  /**
   * Set an error message that will be displayed on the error page
   *
   * @param error
   */
  public setError(error: any) {
    this.appError = error;
  }

  /**
   * Mapping helper for beer
   *
   * @param {BarBeer} dto
   * @returns {BeerBarModel}
   */
  private mapBarBeerDtoToDomainModel(dto: BarBeer): BeerBarModel {
    const model = new BeerBarModel();
    model.barName = dto.barName;
    model.barId = dto.bar;
    model.beerName = dto.beerName;
    model.beerId = dto.beer;
    model.price = dto.price.toString();
    model.servingStyle = dto.servingStyle;

    if (this.debugMode) {
      console.log('mapBarBeerDtoToDomainModel')
      console.log('dto:')
      console.log(dto)
      console.log('viewModel:')
      console.log(model)
    }

    return model;
  }

  /**
   * Mapping helper for bar
   *
   * @param {Bar} dto
   * @returns {BarModel}
   */
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
    if (isNullOrUndefined(dto.image) || dto.image.length === 0) {
      model.image = 'assets/bars/Default.jpg';
    } else {
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

      // open or closed?
      let isLargeScreen = false;
      if (window.innerWidth > 375) {
        isLargeScreen = true;
      }

      const currentTime = new Date()
      model.openNowText = isLargeScreen ? this.barState.CLOSED_TEXT_LARGE : this.barState.CLOSED_TEXT_SMALL;
      if (!isNullOrUndefined(ArrayOpen[currentTime.getDay()]) && !isNullOrUndefined(ArrayClose[currentTime.getDay()])) {
        const openFrom = new Date();
        openFrom.setHours(ArrayOpen[currentTime.getDay()].houre, ArrayOpen[currentTime.getDay()].min, ArrayOpen[currentTime.getDay()].sec)

        const openTo = new Date();
        openTo.setHours(ArrayClose[currentTime.getDay()].houre, ArrayClose[currentTime.getDay()].min, ArrayClose[currentTime.getDay()].sec)

        if (currentTime > openFrom && currentTime < openTo) {
          model.openNowText = isLargeScreen ? this.barState.OPEN_TEXT_LARGE : this.barState.OPEN_TEXT_SMALL;
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

  /**
   * Mapping helper for user
   *
   * @param {User} dto
   * @returns {UserModel}
   */
  private mapUserDtoToDomainModel(dto: User): UserModel {
    const model = new UserModel();
    model.id = dto.id;
    model.firstname = dto.firstname;
    model.lastname = dto.lastname;

    if (isNullOrUndefined(dto.image) || dto.image.length === 0) {
      model.image = 'assets/users/Default.jpg';
    } else {
      model.image = dto.image;
    }

    model.administrator = dto.administrator;
    model.registrationDate = dto.registrationDate;
    model.totalConsumption = dto.totalConsumption;
    model.address = dto.address;
    model.city = dto.city;
    model.tel = dto.tel;
    model.dateOfBirth = dto.dateOfBirth;
    model.location = isNullOrUndefined(dto.location) ? model.location = new GeoData() : model.location = dto.location;

    if (this.debugMode) {
      console.log('mapUserDtoToDomainModel')
      console.log('dto:')
      console.log(dto)
      console.log('viewModel:')
      console.log(model)
    }

    return model;
  }

  /**
   * Mapping helper for user domain
   *
   * @param {UserModel} model
   * @returns {User}
   */
  private mapUserDomainModelToDto(model: UserModel): User {
    const dto = new User();
    dto.id = model.id;
    dto.firstname = model.firstname;
    dto.lastname = model.lastname;
    dto.image = model.image;
    dto.administrator = model.administrator;
    dto.registrationDate = model.registrationDate;
    dto.totalConsumption = model.totalConsumption;
    dto.address = model.address;
    dto.city = model.city;
    dto.tel = model.tel;
    dto.dateOfBirth = model.dateOfBirth;
    dto.location = model.location;

    if (this.debugMode) {
      console.log('mapUserDomainModelToDto')
      console.log('dto:')
      console.log(dto)
      console.log('viewModel:')
      console.log(model)
    }

    return dto;
  }

  /**
   * Mapping helper for beer
   *
   * @param {Beer} dto
   * @returns {BeerModel}
   */
  private mapBeerDtoToDomainModel(dto: Beer): BeerModel {
    const model = new BeerModel();
    model.id = dto.id;
    model.name = dto.name;
    model.description = dto.description;
    model.volume = dto.volume;
    model.brewType = dto.brewType;
    model.owner = dto.owner;
    model.userRating = getRatingDefault();
    model.ratings[0] = 0;
    model.ratings[1] = 0;
    model.ratings[2] = 0;
    if (isNullOrUndefined(dto.image) || dto.image.length === 0) {
      model.image = 'assets/logos/Default.jpg';
    } else {
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
   * Mapping helper for beer domain
   *
   * @param model
   * @returns {Beer} dto
   */
  private mapBeerDomainModeltoDto(model: BeerModel): Beer {
    const dto = new Beer();
    dto.id = model.id;
    dto.name = model.name;
    dto.description = model.description;
    dto.volume = model.volume;
    dto.brewType = model.brewType || new Array<DropDownEntry>();
    ;
    console.log("brauerei", model.brewery);
    dto.brewery = model.brewery.id
    dto.image = model.image;
    dto.taste = model.taste || new Array<DropDownEntry>();
    ;
    dto.location = model.location;
    dto.owner = model.owner;

    if (this.debugMode) {
      console.log('mapBeerDtoToDomainModel')
      console.log('dto:')
      console.log(dto)
      console.log('viewModel:')
      console.log(model)
    }

    return dto;
  }

  /**
   * Mapping helper for brewery domain
   *
   * @param {Brewery} dto
   * @returns {BreweryModel}
   */
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
    model.geoLocation = dto.location;
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

  /**
   * Return beer badges based on user statistics
   *
   * @param {BeerStatistics} beerStat
   * @returns {Badge[]}
   */
  private getBeerBadges(beerStat: BeerStatistics): Badge[] {
    // ********
    // This needs to be refactored to a more flexible pattern once more badges are available.
    // ********
    const badges: Badge[] = [];
    Object.keys(beerStat.beersDrankByDate).forEach((value) => {
      // 5 different beers per day
      let userBeer: UserBeer[] = beerStat.beersDrankByDate[value] || [];
      const differentBeers = [];
      userBeer.map((userBeer: UserBeer) => {
        differentBeers[userBeer.beer] = true;
      })
      if (Object.keys(differentBeers).length >= 5) {
        const badge = new Badge();
        badge.name = BadgeType[BadgeType.Diversity];
        badge.title = BadgeType[BadgeType.Diversity];
        badges.push(badge);
      }
    });

    if (beerStat.differentBeersTotal >= 20) {
      const badge = new Badge();
      badge.name = BadgeType[BadgeType.Connaisseur];
      badge.title = BadgeType[BadgeType.Connaisseur]
      badges.push(badge);
    }
    return badges;
  }

  /**
   * Return bar badges based on user statistics
   *
   * @param {BarStatistics} barStat
   * @returns {Badge[]}
   */
  private getBarBadges(barStat: BarStatistics): Badge[] {
    // ********
    // This needs to be refactored to a more flexible pattern once more badges are available.
    // ********
    const badges: Badge[] = [];
    Object.keys(barStat.barsVisitedByDate).forEach((value) => {
      //3 different beers per day
      const differentBars = [];
      let userBar: UserBar[] = barStat.barsVisitedByDate[value] || [];
      userBar.map((userBar: UserBar) => {
        differentBars[userBar.bar] = true;
      })
      if (Object.keys(differentBars).length >= 3) {
        const badge = new Badge();
        badge.name = BadgeType[BadgeType.NotToSteep];
        badge.title = BadgeType[BadgeType.NotToSteep]
        badges.push(badge);
      }
    });
    return badges;
  }

  /**
   * Return how many beers have been consumed
   *
   * @param {BeerStatistics} beerStat
   * @returns {BeerTotalStatistics[]}
   */
  private getBeerConsumption(beerStat: BeerStatistics): BeerTotalStatistics[] {
    const stat: BeerTotalStatistics[] = [];
    Object.keys(beerStat.totalDrankBeersByBeer).forEach((value: string) => {
      let result: BeerTotalStatistics = {
        name: value.split("_")[1],
        total: beerStat.totalDrankBeersByBeer[value]
      };
      stat.push(result);
    })
    return stat;
  }
}
