import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {BarService} from '../barService';
import {BusinessService} from '../../shared/services/business.service';
import {BeerDatabaseService} from '../../shared/services/beer.service';
import {BreweryDatabaseService} from '../../shared/services/brewery.service';
import {BarDatabaseService} from '../../shared/services/bar.service';
import {UserDatabaseService} from '../../shared/services/user.service';
import {GeoService} from '../../shared/services/geo.service';
import {BarInfoComponent} from './bar-info.component';

describe('BarInfoComponent', () => {
  let component: BarInfoComponent;
  let fixture: ComponentFixture<BarInfoComponent>;
  let name: any;
  let address: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [BarInfoComponent],
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
    fixture = TestBed.createComponent(BarInfoComponent);
    component = fixture.componentInstance;
    name = fixture.debugElement.queryAll(By.css('p'))[0].nativeElement;
    address = fixture.debugElement.queryAll(By.css('p'))[1].nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('no title in the DOM until manually call `detectChanges`', () => {
    expect(name.textContent).toEqual('');
  });

  it('should show a name and address', () => {
    if (!component.id) {
      component.barService.loadBar('1');
    }
    ;
    fixture.detectChanges();
    expect(name.textContent).not.toContain('');
  });
});
