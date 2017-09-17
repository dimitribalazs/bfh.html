import { Component, OnInit } from '@angular/core';
import {BeerService} from '../beerService'
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {MenuService, MenuState} from '../../shared/services/menu.service';
import {AroundYou} from "../../shared/dto/aroundYou";

@Component({
  selector: 'app-available-bars',
  templateUrl: './available-bars.component.html',
  styleUrls: ['./available-bars.component.css']
})
export class AvailableBeersComponent implements OnInit {
  search: boolean;
  searchSubject: Subject<String> = new BehaviorSubject<String>('');
  filterSubject: Subject<number> = new BehaviorSubject<number>(1);

  constructor(private beerService: BeerService,
              private menuService: MenuService,
              private router: Router) {
    this.search = false;
  }

  setMenu() {
    this.menuService.setNewState({
      titleText: 'Beer info',
      visibleBack: true,
      visibleHomeLink: true,
      visibleEdit: true
    });
  }

  ngOnInit() {
    this.setMenu()
  }

  onAddBeer() {
    if (this.search) {
      this.search = false;
      this.setMenu()
    } else {
      this.search = true;
      this.menuService.setNewState({
        visibleSearchInput: true,
        visibleTitle: false,
        onInput: (e: string) => {
          // this.activeSearchString = e;
          this.searchSubject.next(e)
        }
      })
    }
  }

  onResult(data: AroundYou) {
    this.beerService.addBar(data.id, data.name);
    this.search = false;
    this.setMenu()
  }

  onBarShow(id: number) {
    this.router.navigate(['bar', id]);
  }

  onRemove(id: string) {
    this.beerService.removeBar(id)
  }

}



