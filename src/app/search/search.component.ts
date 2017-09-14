import {Component, OnChanges, OnInit} from '@angular/core';
import {MenuService} from '../shared/services/menu.service';
import {BehaviorSubject} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {AroundYou} from '../shared/dto/aroundYou';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  searchSubject: Subject<String> = new BehaviorSubject<String>('');
  filterSubject: Subject<number> = new BehaviorSubject<number>(0);
  activefilter: number;
  activeSearchString: string;

  constructor(private menuService: MenuService, private router: Router) {
    this.activeSearchString = '';
    this.activefilter = 0
  }

  ngOnInit() {
    this.menuService.setNewState({
      visibleBack: true,
      visibleSearchInput: true,
      callback: (e: string) => {
        this.activeSearchString = e;
        this.searchSubject.next(e)
      }
    });
  }

  onClick(activateFilter: number) {
    this.filterSubject.next(activateFilter)
    this.activefilter = activateFilter;
    this.searchSubject.next(this.activeSearchString)
  }

  onResult(data: AroundYou) {
    this.router.navigate([data.routerNavigate, data.id]);
  }

  onAddBeer(data: AroundYou) {
    console.log(data)
    this.router.navigate(['beer/new', {name: data}]);
  }
}
