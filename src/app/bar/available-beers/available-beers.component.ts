import {Component, OnInit} from '@angular/core';
import {BarService} from '../barService';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/Rx';
import {MultiNavigationModel} from '../../shared/domainModel/multiNavigationModel';
import {BeerBarModel} from "../../shared/domainModel/viewModels";

@Component({
  selector: 'app-available-beers',
  templateUrl: './available-beers.component.html',
  styleUrls: ['./available-beers.component.css']
})
export class AvailableBeersComponent implements OnInit {
  // beers: Observable<Beer[]>;

  filter: number
  service: BarService

  constructor(private barService: BarService, private router: Router) {
    this.service = barService;
    this.filter = 3
  }

  ngOnInit() {
  }

  onAddBeer() {
    // TODO
    alert('noch nicht implementiert')
  }

  onShowBeer(id: string) {
    this.router.navigate(['beer', id]);
  }

  addBeer(id: string) {
    console.log('******************************************add')
  }
  removeBeer(id: string) {
    console.log('******************************************remove')
  }
}



