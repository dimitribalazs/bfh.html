import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Import all AngularModules needed
import { FormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';

// Provide ALL Services, and their dependencies
import {BeerService} from '../beerService'
import { BusinessService } from '../../shared/services/business.service';
import {BeerDatabaseService} from '../../shared/services/beer.service';
import {BreweryDatabaseService} from '../../shared/services/brewery.service';
import {BarDatabaseService} from '../../shared/services/bar.service';
import {UserDatabaseService} from '../../shared/services/user.service';
import {GeoService} from '../../shared/services/geo.service';
import {MenuService} from '../../shared/services/menu.service';

import { BeerInfoComponent } from './beer-info.component';

describe('BeerInfoComponent', () => {
  let component: BeerInfoComponent;
  let fixture: ComponentFixture<BeerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule ],
      declarations: [ BeerInfoComponent ],
      providers: [ BeerService, MenuService,
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
    fixture = TestBed.createComponent(BeerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
