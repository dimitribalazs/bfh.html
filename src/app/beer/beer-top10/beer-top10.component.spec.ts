import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {BeerService} from '../beerService'
import {BusinessService} from '../../shared/services/business.service';
import {BeerDatabaseService} from '../../shared/services/beer.service';
import {BreweryDatabaseService} from '../../shared/services/brewery.service';
import {BarDatabaseService} from '../../shared/services/bar.service';
import {UserDatabaseService} from '../../shared/services/user.service';
import {GeoService} from '../../shared/services/geo.service';
import {MenuService} from '../../shared/services/menu.service';
import {BeerTop10Component} from './beer-top10.component';

describe('BeerTop10Component', () => {
  let component: BeerTop10Component;
  let fixture: ComponentFixture<BeerTop10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [BeerTop10Component],
      providers: [BeerService, MenuService,
        BusinessService,
        BeerDatabaseService,
        BreweryDatabaseService,
        BarDatabaseService,
        UserDatabaseService,
        GeoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerTop10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
