import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {BreweryService} from '../brewery/breweryService';
import {BusinessService} from '../shared/services/business.service';
import {MenuService} from '../shared/services/menu.service';
import {BeerDatabaseService} from '../shared/services/beer.service';
import {BreweryDatabaseService} from '../shared/services/brewery.service';
import {BarDatabaseService} from '../shared/services/bar.service';
import {UserDatabaseService} from '../shared/services/user.service';
import {GeoService} from '../shared/services/geo.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AvailableDataComponent} from '../shared/components/available/available-data/available-data.component';
import {SearchResultComponent} from '../shared/components/search-result/searchResult.component';
import {LinkInformationComponent} from '../shared/components/available/link-information/link-information.component';
import {SearchComponent} from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [SearchComponent, AvailableDataComponent, SearchResultComponent, LinkInformationComponent],
      providers: [MenuService,
        BusinessService,
        BeerDatabaseService,
        BreweryDatabaseService,
        BarDatabaseService,
        UserDatabaseService,
        GeoService,
        BreweryService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
