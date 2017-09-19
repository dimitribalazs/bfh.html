import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableBeersComponent } from './available-bars.component';

describe('AvailableBeersComponent', () => {
  let component: AvailableBeersComponent;
  let fixture: ComponentFixture<AvailableBeersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableBeersComponent ]
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
