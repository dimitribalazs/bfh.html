import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import {RatingModel} from '../shared/components/rating/ratingModel';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

// Provide ALL Services, and their dependencies
import { MenuService } from '../shared/services/menu.service';
import { BarService } from './barService';
import { BusinessService } from '../shared/services/business.service';
import { BeerDatabaseService } from '../shared/services/beer.service';
import { BreweryDatabaseService } from '../shared/services/brewery.service';
import { BarDatabaseService } from '../shared/services/bar.service';
import { UserDatabaseService } from '../shared/services/user.service';
import { GeoService } from '../shared/services/geo.service';

import { RouterTestingModule } from '@angular/router/testing';

// Import all dependening components
import { RatingComponent } from '../shared/components/rating/rating.component';

import { BarComponent } from './bar.component';

let MockBar: BarComponent = <BarComponent>{id: '1', activeNavigation: 1}

describe('BarComponent', () => {
  let component: BarComponent;
  let fixture: ComponentFixture<BarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule ],
      declarations: [ BarComponent, RatingComponent ],
      providers: [ BarService,
        MenuService,
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
    fixture = TestBed.createComponent(BarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

export class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}
