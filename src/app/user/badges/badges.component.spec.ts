import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../userService';
import { BusinessService } from '../../shared/services/business.service';
import { BeerDatabaseService } from '../../shared/services/beer.service';
import { BreweryDatabaseService } from '../../shared/services/brewery.service';
import { BarDatabaseService } from '../../shared/services/bar.service';
import { UserDatabaseService } from '../../shared/services/user.service';
import { GeoService } from '../../shared/services/geo.service';
import { MenuService } from '../../shared/services/menu.service';
import { BadgesComponent } from './badges.component';

describe('BadgesComponent', () => {
  let component: BadgesComponent;
  let fixture: ComponentFixture<BadgesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BadgesComponent],
      providers: [UserService,
        BusinessService,
        BeerDatabaseService,
        BreweryDatabaseService,
        BarDatabaseService,
        UserDatabaseService,
        GeoService,
        MenuService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
