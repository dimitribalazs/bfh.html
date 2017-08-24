import { Component, OnInit, HostBinding  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import {BarDatabaseService} from '../../database.service';
import {Bar} from '../../shared/dto/bar';

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
    // private service: BarDatabaseService<Bar>
  ) {}

  ngOnInit() {
    // this.route.paramMap
    //   .switchMap((params: ParamMap) =>
    //     this.service.getAll(params.get('id')))
    //   .subscribe((bar: Bar) => this.bar = bar);
  }

  gotoBars() {
    let barId = this.bar ? this.bar.id : null;
    this.router.navigate(['/bars', { id: barId, foo: 'foo' }]);
  }

}
