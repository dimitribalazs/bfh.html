import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkInformationComponent } from './link-information.component';

describe('LinkInformationComponent', () => {
  let component: LinkInformationComponent;
  let fixture: ComponentFixture<LinkInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
