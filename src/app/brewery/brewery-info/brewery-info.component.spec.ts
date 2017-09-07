import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryInfoComponent } from './brewery-info.component';

describe('BreweryInfoComponent', () => {
  let component: BreweryInfoComponent;
  let fixture: ComponentFixture<BreweryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
