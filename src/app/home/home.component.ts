import { Component, OnInit } from '@angular/core';
import { Bar } from '../shared/dto/Bar';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Beer} from '../shared/dto/Beer';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {BeerDatabaseService} from '../shared/services/beer.service';
import * as NewBeer from '../shared/dto/Beer';
import {AroundYou} from './AroundYouModel';
import {User} from '../shared/dto/user';
import {UserDatabaseService} from '../shared/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Duffd';
   beers: Observable<Beer[]>;
  users: Observable<User[]>;
   arroundYou: AroundYou[] = new Array();


  private selectedId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceBeer: BeerDatabaseService<Beer>,
    private serviceUser: UserDatabaseService<User>,
  ) { }

  ngOnInit() {

    this.beers = this.serviceBeer.getAll()

    this.beers.subscribe((value) => {
      value.forEach((beer) => {
        const a: AroundYou = new AroundYou();
        a.id = beer.id;
        a.name = beer.name;
        a.routerNavigate = '/beer/'
        if (this.arroundYou.length < 5) {
          this.arroundYou.push(a)
        }
      })
    })

      this.serviceBeer.listen();


  }

  isSelected(around: AroundYou) { return around.id === this.selectedId; }

  // onSelect(beer: Beer) {
  //   this.router.navigate(['/beer/edit/', beer.id]);
  // }

  onSelect(around: AroundYou) {
    this.router.navigate([around.routerNavigate, around.id]);
  }

  changeDb(event): void {
    console.log(event);
  }

  createBeer(event): void {
    console.log(event);
    // const beer = new NewBeer.Beer();
    // beer.name = "Bier vo ergendwo";
    // beer.volume = 20;
    // beer.description = "super fein";
    // beer.taste = NewBeer.Taste.Fruchtig;
    // this.databaseService.create(beer);
  }
}
