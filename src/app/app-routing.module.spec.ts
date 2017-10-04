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
});
