import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// Import all AngularModules needed
import { FormsModule } from '@angular/forms';
// import { Router, ActivatedRoute } from '@angular/router';
// import { RouterStub } from '../bar.component.spec';
import { RouterTestingModule } from '@angular/router/testing';

// Provide ALL Services, and their dependencies
import { BarService } from '../barService';
import { BusinessService } from '../../shared/services/business.service';
import {BeerDatabaseService} from '../../shared/services/beer.service';
import {BreweryDatabaseService} from '../../shared/services/brewery.service';
import {BarDatabaseService} from '../../shared/services/bar.service';
import {UserDatabaseService} from '../../shared/services/user.service';
import {GeoService} from '../../shared/services/geo.service';

// Import the Component
import { BarInfoComponent } from './bar-info.component';

describe('BarInfoComponent', () => {
  let component: BarInfoComponent;
  let fixture: ComponentFixture<BarInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule ],
      declarations: [ BarInfoComponent ],
      providers: [ BarService,
        BusinessService,
        BeerDatabaseService,
        BreweryDatabaseService,
        BarDatabaseService,
        UserDatabaseService,
        GeoService]
        // { provide: Router, useClass: RouterStub  }]
        // { provide: ActivatedRoute, useClass: class { params = jasmine.createSpy('id'); } } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
