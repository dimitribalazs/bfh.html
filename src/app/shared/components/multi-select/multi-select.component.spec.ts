import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasteMultiSelectComponent } from './multi-select.component';

describe('TasteMultiSelectComponent', () => {
  let component: TasteMultiSelectComponent;
  let fixture: ComponentFixture<TasteMultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasteMultiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasteMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
