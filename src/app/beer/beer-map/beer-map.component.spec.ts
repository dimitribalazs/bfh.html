import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerMapComponent } from './beer-map.component';

describe('BeerMapComponent', () => {
  let component: BeerMapComponent;
  let fixture: ComponentFixture<BeerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
