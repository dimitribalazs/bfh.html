import {Component} from '@angular/core';
import {BarService} from '../barService';

@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.css']
})
export class OpeningHoursComponent {
  constructor(public barService: BarService) {
  }
}
