import {Component, OnInit} from '@angular/core';
import {Bar} from '../../shared/dto/bar';
import {BarService} from '../barService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bar-info',
  templateUrl: './bar-info.component.html',
  styleUrls: ['./bar-info.component.css']
})
export class BarInfoComponent implements OnInit {
  // model: Bar = new Bar;

  constructor(private barService: BarService, private router: Router) {
  }

  ngOnInit() {
    // this.barService.getBar().subscribe((beer) => {
    //   this.model = this.barService.getViewModel();
    // })
  }

  onClick(childView: string, activateNavigation: number) {
    this.router.navigate(['bar', 1, childView]);
  }

}
