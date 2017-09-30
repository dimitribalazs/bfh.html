import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

// Provide ALL Services, and their dependencies
import { BreweryService } from '../../brewery/breweryService';
import { BusinessService } from '../../shared/services/business.service';
import {MenuService} from '../../shared/services/menu.service';
import {BeerDatabaseService} from '../../shared/services/beer.service';
import {BreweryDatabaseService} from '../../shared/services/brewery.service';
import {BarDatabaseService} from '../../shared/services/bar.service';
import {UserDatabaseService} from '../../shared/services/user.service';
import {GeoService} from '../../shared/services/geo.service';

import { RouterTestingModule } from '@angular/router/testing';

import { BreweryInfoComponent } from './brewery-info.component';

describe('BreweryInfoComponent', () => {
  let component: BreweryInfoComponent;
  let fixture: ComponentFixture<BreweryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule ],
      declarations: [ BreweryInfoComponent ],
      providers: [ MenuService,
        BusinessService,
        BeerDatabaseService,
        BreweryDatabaseService,
        BarDatabaseService,
        UserDatabaseService,
        GeoService,
        BreweryService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
