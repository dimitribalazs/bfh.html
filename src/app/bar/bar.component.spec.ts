import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // needed when NgForm is used

import {RatingModel} from '../shared/components/rating/ratingModel';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

// Provide ALL Services, and their dependencies
import {MenuService} from '../shared/services/menu.service';
import {BarService} from './barService';

import { BarComponent } from './bar.component';

describe('BarComponent', () => {
  let component: BarComponent;
  let fixture: ComponentFixture<BarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ BarComponent ],
      providers: [ BarService,
        MenuService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
