import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import {Bar} from "./Bar";
import {BarService} from "./bar.service";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
  providers: [BarService]
})
export class BarComponent implements OnInit {
  bars: Observable<Bar[]>;

  private selectedId: number;

  constructor(
    private service: BarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.bars = this.route.paramMap
      .switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.service.getBars();
      });
  }

  isSelected(bar: Bar) { return bar.id === this.selectedId; }

  onSelect(hero: Bar) {
    this.router.navigate(['/bar', hero.id]);
  }

}
