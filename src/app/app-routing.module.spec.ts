import { TestBed, fakeAsync, inject, ComponentFixture, tick, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

describe('App-routing module', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppRoutingModule
      ],
    }).compileComponents();
  }));

//   it('allows access to dashboard', fakeAsync(inject([ Router, Location ], (router: Router, location: Location) => {
//     const fixture = TestBed.createComponent(RootComponent);
//     router.resetConfig(routes);
//     router.navigate([ 'dashboard' ]);
//     advance(fixture);
//     expect(location.path()).toEqual('/dashboard');
// })));

});
