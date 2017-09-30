import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Beer} from '../../shared/dto/beer';
import {UserService} from '../userService';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BusinessService} from '../../shared/services/business.service';

const USER_CURRENT_NO_FAVOURITES = 'You have no favourite beer!';
const USER_FOREIGN_NO_FAVOURITES = 'This user has no favourite beers';
const USER_CURRENT_GET_OUT  = 'We suggest, you get out and have a few beers.';
const USER_FOREIGN_GET_OUT  = 'We suggest, you get out and have a few beers with this person.';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  txtNoFavourites = USER_FOREIGN_NO_FAVOURITES;
  txtGetOut = USER_FOREIGN_GET_OUT;
  hasFavourites = true;

  private selectedId: string;

  constructor(public userService: UserService,
              private router: Router,
              private businessService: BusinessService) {
  }

  ngOnInit() {
    this.userService.viewModel.favoriteBeers.subscribe(favs => {
      this.hasFavourites = favs.length > 0;

      if (this.businessService.currentUser.id === this.userService.viewModel.id) {
        this.txtNoFavourites = USER_CURRENT_NO_FAVOURITES;
        this.txtGetOut = USER_CURRENT_GET_OUT;
      }
    });
  }

  isSelected(beer: Beer) {
    return beer.id === this.selectedId;
  }

  onSelect(beer: Beer) {
    this.router.navigate(['beer', beer.id]);
  }
}
