import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import {Bar} from '../shared/dto/Bar';
import {BeerDatabaseService} from '../shared/services/beer.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MenuService} from '../shared/services/menu.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
  // providers: [BeerDatabaseService]
})
export class BarComponent implements OnInit {
  bars: Observable<Bar[]>;
  menu: MenuService;

  private selectedId: number;

  constructor(
    private service: BeerDatabaseService<Bar>,
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService) {
    this.menu = menuService;
    this.menu.TitleText = 'Bar info';
    this.menu.visibleHomeLink = true;
    this.menu.visibleSearchLink = false;
    this.menu.visibleTitle = true;
    this.menu.visibleSearchInput = false;
    this.menu.visibleEdit = true;
  }

  ngOnInit() {
    // this.bars = this.route.paramMap
    //   .switchMap((params: ParamMap) => {
    //     // (+) before `params.get()` turns the string into a number
    //     this.selectedId = +params.get('id');
    //     return this.service.getAll();
    //   });
    return this.service.getAll();
  }

  // isSelected(bar: Bar) { return bar.id === this.selectedId; }

  onSelect(hero: Bar) {
    this.router.navigate(['/bar', hero.id]);
  }

}
