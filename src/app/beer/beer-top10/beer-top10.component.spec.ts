import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Import all AngularModules needed
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { BeerTop10Component } from './beer-top10.component';

describe('BeerTop10Component', () => {
  let component: BeerTop10Component;
  let fixture: ComponentFixture<BeerTop10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule ],
      declarations: [ BeerTop10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerTop10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
