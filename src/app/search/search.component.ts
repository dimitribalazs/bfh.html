import { Component, OnInit } from '@angular/core';
import {MenuService} from '../shared/services/menu.service';
import {BehaviorSubject} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {AroundYou} from '../shared/dto/aroundYou';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchSubject: Subject<String> = new BehaviorSubject<String>('');
  filterSubject: Subject<number> = new BehaviorSubject<number>(0);
  activefilter: number
  activeSearchString: string

  constructor(
    private menuService: MenuService,
    private router: Router) {
    this.menuService.setDefault();
    this.menuService.visibleHomeLink = true;
    this.menuService.visibleTitle = false;
    this.menuService.visibleSearchInput = true;

    this.activeSearchString = ''

    this.menuService.searchInputCallback = (e: string) => {
      this.activeSearchString = e
      this.searchSubject.next(e)
      // console.log(e.target.value)
    }

    this.activefilter = 0
  }

  ngOnInit() {
  }

  onClick(activateFilter: number) {
    this.filterSubject.next(activateFilter)
    this.activefilter = activateFilter;
    this.searchSubject.next(this.activeSearchString)
  }

  onResult(data: AroundYou) {
    this.router.navigate([data.routerNavigate, data.id]);
  }

}
