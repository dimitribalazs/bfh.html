import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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
  let name: any;
  let volumePercent: any;
  let brewType : any;
  let taste: any;

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
    name = fixture.debugElement.query(By.css('p:first-of-type')).nativeElement;
    volumePercent = fixture.debugElement.query(By.css('p:nth-of-type(1)')).nativeElement;
    brewType = fixture.debugElement.query(By.css('p:nth-of-type(2)'));
    taste = fixture.debugElement.query(By.css('p:nth-of-type(3)'));
    // fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('no title in the DOM until manually call `detectChanges`', () => {
    expect(name.textContent).toEqual('');
    expect(volumePercent.textContent).toEqual('');
  });

  it('should show name, volumePercent, brewType and taste', () => {
    if (!component.id) {
      component.beerService.loadBeer('1');
    };
    fixture.detectChanges();
    expect(name.textContent).not.toContain('');
    expect(volumePercent.textContent).not.toContain('');
    expect(brewType[0].textContent).not.toContain('');
    expect(taste.textContent).not.toContain('');
  });
});
