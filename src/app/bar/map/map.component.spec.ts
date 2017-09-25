import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // needed when NgForm is used

// Provide ALL Services, and their dependencies
import { BarService } from '../barService';
import { BusinessService } from '../../shared/services/business.service';
import {BeerDatabaseService} from '../../shared/services/beer.service';
import {BreweryDatabaseService} from '../../shared/services/brewery.service';
import {BarDatabaseService} from '../../shared/services/bar.service';
import {UserDatabaseService} from '../../shared/services/user.service';
import {GeoService} from '../../shared/services/geo.service';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ MapComponent ],
      providers: [ BarService,
        BusinessService,
        BeerDatabaseService,
        BreweryDatabaseService,
        BarDatabaseService,
        UserDatabaseService,
        GeoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
