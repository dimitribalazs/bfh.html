import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../shared/services/menu.service';
import { BusinessService } from '../shared/services/business.service';
import { BeerService } from './beerService'
import { BeerDatabaseService } from '../shared/services/beer.service';
import { BreweryDatabaseService } from '../shared/services/brewery.service';
import { BarDatabaseService } from '../shared/services/bar.service';
import { UserDatabaseService } from '../shared/services/user.service';
import { GeoService } from '../shared/services/geo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AvailableDataComponent } from '../shared/components/available/available-data/available-data.component';
import { SearchResultComponent } from '../shared/components/search-result/searchResult.component';
import { LinkInformationComponent } from '../shared/components/available/link-information/link-information.component';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';
import { RatingComponent } from '../shared/components/rating/rating.component';
import { BeerComponent } from './beer.component';

describe('BeerComponent', () => {
  let component: BeerComponent;
  let fixture: ComponentFixture<BeerComponent>;
  let beerService: BeerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [BeerComponent, RatingComponent,
        AvailableDataComponent,
        SearchResultComponent,
        LinkInformationComponent,
        ImageUploaderComponent],
      providers: [BeerService,
        MenuService,
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
    fixture = TestBed.createComponent(BeerComponent);
    component = fixture.componentInstance;

    beerService = fixture.debugElement.injector.get(BeerService);
    let spy = spyOn(beerService, 'loadBeer').and.returnValue(Promise.resolve(BeerComponent));

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
