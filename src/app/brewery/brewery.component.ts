import { Component, OnInit } from '@angular/core';
import {MenuService} from '../shared/services/menu.service';
import {BreweryService} from "./breweryService";
import {Brewery} from "../shared/dto/brewery";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-brewery',
  templateUrl: './brewery.component.html',
  styleUrls: ['./brewery.component.css']
})
export class BreweryComponent implements OnInit {

  id: string;
  model: Brewery = new Brewery();
  activeNavigation: number;


  constructor(private breweryService: BreweryService,
              private route: ActivatedRoute,
              private router: Router,
              private menuService: MenuService) {
    // this.menuService.setDefault();
    // this.menuService.TitleText = 'Brewery info';
    // this.menuService.visibleHomeLink = true;
    this.activeNavigation = 1;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.breweryService.loadBar(params['id']);
    });

    this.breweryService.getBrewery().subscribe((beer) => {
      this.model = this.breweryService.getViewModel();
      console.log(this.model)
    })
  }

  onClick(childView: string, activateNavigation: number) {
    this.router.navigate(['brewery', this.id, childView]);
    this.activeNavigation = activateNavigation;
  }
}
