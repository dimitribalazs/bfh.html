import { Component, OnInit } from '@angular/core';
import {Bar} from '../../shared/dto/bar';
import {BarService} from "../barService";

@Component({
  selector: 'app-bar-info',
  templateUrl: './bar-info.component.html',
  styleUrls: ['./bar-info.component.css']
})
export class BarInfoComponent implements OnInit {
  // model: Bar = new Bar;

  constructor(private barService: BarService) {
  }

  ngOnInit() {
    // this.barService.getBar().subscribe((beer) => {
    //   this.model = this.barService.getViewModel();
    // })
  }

}
