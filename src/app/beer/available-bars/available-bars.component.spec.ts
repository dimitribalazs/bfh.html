import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BeerService } from '../beerService'
import { BusinessService } from '../../shared/services/business.service';
import { BeerDatabaseService } from '../../shared/services/beer.service';
import { BreweryDatabaseService } from '../../shared/services/brewery.service';
import { BarDatabaseService } from '../../shared/services/bar.service';
import { UserDatabaseService } from '../../shared/services/user.service';
import { GeoService } from '../../shared/services/geo.service';
import { MenuService } from '../../shared/services/menu.service';
import { BreweryService } from '../../brewery/breweryService';
import { RouterTestingModule } from '@angular/router/testing';
import { AvailableDataComponent } from '../../shared/components/available/available-data/available-data.component';
import { SearchResultComponent } from '../../shared/components/search-result/searchResult.component';
import { LinkInformationComponent } from '../../shared/components/available/link-information/link-information.component';
import { AvailableBeersComponent } from './available-bars.component';

describe('AvailableBars in BeerComponent', () => {
  let component: AvailableBeersComponent;
  let fixture: ComponentFixture<AvailableBeersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [AvailableBeersComponent, AvailableDataComponent, SearchResultComponent, LinkInformationComponent],
      providers: [BeerService, MenuService, BreweryService,
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
    fixture = TestBed.createComponent(AvailableBeersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
