import { Component, OnInit, HostBinding  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {HomeService} from '../../home/home.service';
import {Beer} from '../Beer';
import {BeerService} from '../beer.service';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html'
})
export class BeerDetailComponent implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  // @HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';

  beer: Beer;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BeerService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getBeer(params.get('id')))
      .subscribe((beer: Beer) => this.beer = beer);
  }

  gotoBeers() {
    const beerId = this.beer ? this.beer.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/home']);
  }
}
