import { Component, OnInit } from '@angular/core';
import {MenuService} from '../shared/services/menu.service';
import {BreweryService} from './breweryService';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-brewery',
  templateUrl: './brewery.component.html',
  styleUrls: ['./brewery.component.css']
})
export class BreweryComponent implements OnInit {

  id: string;
  activeNavigation: number;


  constructor(public breweryService: BreweryService,
              private route: ActivatedRoute,
              private router: Router,
              private menuService: MenuService) {
    this.activeNavigation = 0;
  }

  ngOnInit() {
    this.menuService.setNewState(this.breweryService.getMenuState());

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.breweryService.loadBrewery(params['id']);
    });
  }

  onClick(childView: string, activateNavigation: number) {
    this.router.navigate(['brewery', this.id, childView]);
    this.activeNavigation = activateNavigation;
  }
}
