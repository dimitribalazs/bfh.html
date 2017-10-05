import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {Router} from '@angular/router';
import {AroundYou} from '../shared/domainModel/aroundYou';
import {MenuService} from '../shared/services/menu.service';
import {BusinessService} from "../shared/services/business.service";

@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Duffd';
  arroundYou: Observable<AroundYou[]> = new Observable<AroundYou[]>();
  private selectedId: string;

  constructor(private router: Router,
              private menuService: MenuService,
              public businessService: BusinessService) {
  }


  ngOnInit() {
    this.menuService.setNewState({
      titleText: 'Duff\'d',
      visibleSearchLink: true,
      visibleTitle: true,
      visibleMenu: true
    });

    this.arroundYou = this.businessService.getAroundYou();
    this.businessService.topBeer();

    this.businessService.positionSubject.subscribe(() => {
      this.arroundYou = this.businessService.getAroundYou();
    })
  }

  isSelected(around: AroundYou) {
    return around.id === this.selectedId;
  }

  onSelect(around: AroundYou) {
    this.router.navigate([around.routerNavigate, around.id]);
  }
}
