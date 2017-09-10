import { Component, OnInit } from '@angular/core';
import {BarService} from '../barService';
import {Bar, OpeningHours} from '../../shared/dto/bar';

@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.css']
})
export class OpeningHoursComponent implements OnInit {

  model: Bar = new Bar();

  constructor(private barService: BarService) {
    this.model.openingHours = new OpeningHours();
  }

  ngOnInit() {
    this.barService.getBar().subscribe((beer) => {
      this.model = this.barService.getViewModel();
    })
  }

}
