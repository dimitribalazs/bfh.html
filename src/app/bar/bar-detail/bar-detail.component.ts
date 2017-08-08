import { Component, OnInit, HostBinding  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {BarService} from "../bar.service";
import {Bar} from "../Bar";

@Component({
  selector: 'app-bar-detail',
  templateUrl: './bar-detail.component.html',
  styleUrls: ['./bar-detail.component.css']
})
export class BarDetailComponent implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  // @HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';

  bar: Bar;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BarService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getHero(params.get('id')))
      .subscribe((bar: Bar) => this.bar = bar);
  }

  gotoBars() {
    let barId = this.bar ? this.bar.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/bars', { id: barId, foo: 'foo' }]);
  }

}
