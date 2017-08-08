import { Component, Input } from '@angular/core';
import {Beer} from "../Beer";

@Component({
  selector: 'beer-detail',
  template: `
    <div *ngIf="beer">
      <h2>{{beer.name}} details!</h2>
      <div>
        <label>id: </label>{{beer.id}}
      </div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="beer.name" placeholder="name"/>
      </div>
    </div>
  `
})
export class BeerDetailComponent{
@Input() beer: Beer;
}
