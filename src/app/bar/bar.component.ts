import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {Bar} from '../shared/dto/bar';
import {RatingModel} from '../shared/components/rating/ratingModel';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MenuService} from '../shared/services/menu.service';
import {BarService} from './barService';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit {

  id: string;
  activeNavigation: number;


  constructor(private barService: BarService,
              private route: ActivatedRoute,
              private router: Router,
              private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.setNewState(this.barService.getMenuState());

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.barService.loadBar(params['id']);
    });
    this.activeNavigation = 0;
  }

  onClick(childView: string, activateNavigation: number) {
    this.router.navigate(['bar', this.id, childView]);
    this.activeNavigation = activateNavigation;
  }

  onRatingChange(rating: RatingModel) {
    this.barService.setUserRating(rating);
  }

  onCheers(beerId: string) {
    this.barService.addBeerDrank(beerId)
    this.menuService.setNewState({
      titleText: 'KEEP CALM AND SAY CHEERS',
      visibleTitle: true,
      visibleBack: false,
      visibleHomeLink: true,
      visibleEdit: false
    });

    setTimeout(() => {
      this.menuService.setNewState(this.barService.getMenuState());
    }, 2500);
  }

  onVisit() {
    this.barService.addBarVisited()
    this.menuService.setNewState({
      titleText: 'KEEP CALM AND ENJOY IT',
      visibleTitle: true,
      visibleBack: false,
      visibleHomeLink: true,
      visibleEdit: false
    });

    setTimeout(() => {
      this.menuService.setNewState(this.barService.getMenuState());
    }, 2500);
  }

}
