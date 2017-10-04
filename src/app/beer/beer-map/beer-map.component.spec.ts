import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {BarService} from '../../bar/barService'
import {BeerService} from '../beerService'
import {BusinessService} from '../../shared/services/business.service';
import {BeerDatabaseService} from '../../shared/services/beer.service';
import {BreweryDatabaseService} from '../../shared/services/brewery.service';
import {BarDatabaseService} from '../../shared/services/bar.service';
import {UserDatabaseService} from '../../shared/services/user.service';
import {GeoService} from '../../shared/services/geo.service';
import {MenuService} from '../../shared/services/menu.service';
import {BeerMapComponent} from './beer-map.component';

describe('BeerMapComponent', () => {
  let component: BeerMapComponent;
  let fixture: ComponentFixture<BeerMapComponent>;
  let map: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [BeerMapComponent],
      providers: [BeerService, MenuService, BarService,
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
    fixture = TestBed.createComponent(BeerMapComponent);
    component = fixture.componentInstance;
    map = fixture.debugElement.query(By.css('#map'));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show a map', () => {
    expect(map).toBeTruthy();
  });
});
