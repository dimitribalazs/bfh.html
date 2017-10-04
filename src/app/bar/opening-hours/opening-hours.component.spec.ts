import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BarService } from '../barService';
import { BusinessService } from '../../shared/services/business.service';
import { BeerDatabaseService } from '../../shared/services/beer.service';
import { BreweryDatabaseService } from '../../shared/services/brewery.service';
import { BarDatabaseService } from '../../shared/services/bar.service';
import { UserDatabaseService } from '../../shared/services/user.service';
import { GeoService } from '../../shared/services/geo.service';
import { OpeningHoursComponent } from './opening-hours.component';

describe('OpeningHoursComponent', () => {
  let component: OpeningHoursComponent;
  let fixture: ComponentFixture<OpeningHoursComponent>;
  let barService: BarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [OpeningHoursComponent],
      providers: [BarService,
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
    fixture = TestBed.createComponent(OpeningHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
