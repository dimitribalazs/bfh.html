import { Component, OnInit, HostBinding  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Beer} from '../../dto/beer';
import {BeerDatabaseService} from '../../database.service';

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
    private service: BeerDatabaseService<Beer>
  ) {}

  ngOnInit() {
    // this.route.paramMap
    //   .switchMap((params: ParamMap) =>
    //     this.service.getBeer(params.get('id')))
    //   .subscribe((beer: Beer) => this.beer = beer);
  }

  gotoBeers() {
    const beerId = this.beer ? this.beer.id : null;
    this.router.navigate(['/home']);
  }
}
