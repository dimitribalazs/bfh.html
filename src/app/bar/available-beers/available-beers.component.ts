import {Component, OnInit} from '@angular/core';
import {BarService} from '../barService';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-available-beers',
  templateUrl: './available-beers.component.html',
  styleUrls: ['./available-beers.component.css']
})
export class AvailableBeersComponent implements OnInit {
  // beers: Observable<Beer[]>;

  service: BarService

  constructor(private barService: BarService, private router: Router,) {
    this.service = barService;
  }

  ngOnInit() {

    // this.beers = this.barService.getAvailableBeers('1');
  }

  onAddBeer() {
    // TODO
    alert('noch nicht implementiert')
  }

  onShowBeer(id: string) {
    this.router.navigate(['beer', id]);
  }
}



