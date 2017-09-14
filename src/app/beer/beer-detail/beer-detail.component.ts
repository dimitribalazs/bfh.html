import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Beer, DropDownEntry, DropDownlists} from '../../shared/dto/beer';
import {Brewery} from '../../shared/dto/brewery';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {BierService} from '../beerService'
import {MenuService} from '../../shared/services/menu.service';
import {isUndefined} from "util";

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['../beer.component.css']
})
export class BeerDetailComponent implements OnInit {

  // model: Beer = new Beer;
  public submitted: boolean = false;
  public formErrorMessage: boolean = false;
  dropDownlists = new DropDownlists()
  breweryDropDownList: DropDownEntry[];
  brewerySelectedItem: DropDownEntry[] = new Array;

  constructor(private beerService: BierService,
              private menuService: MenuService,
              private router: Router) {

  }


  ngOnInit() {
    this.menuService.setDefault();
    this.menuService.TitleText = 'Enter or edit beer info'
    this.menuService.visibleSave = true;
    this.menuService.visibleBack = true;
    this.menuService.submitCallback = () => {

      if (isUndefined(this.beerService.viewModel.name) || this.beerService.viewModel.name.length === 0 ||
        isUndefined(this.beerService.viewModel.description) || this.beerService.viewModel.description.length === 0) {
        this.formErrorMessage = true;
      } else {
        this.beerService.submit();
        this.submitted = true;
        this.formErrorMessage = false;
        this.router.navigate(['beer/', this.beerService.viewModel.id]);
      }
    }
    this.beerService.getBeer().subscribe((beer) => {
      // this.beerService.viewModel = this.beerService.getViewModel();
      if (!isUndefined(this.beerService.viewModel.brewery)) {
        const selectedItem: DropDownEntry = new DropDownEntry();
        selectedItem.id = this.beerService.viewModel.brewery;
        //todo get from brewery
        //selectedItem.itemName = this.beerService.viewModel.brewery.name;
        this.brewerySelectedItem.push(selectedItem);
      }
    })

    this.beerService.getBroweryList().subscribe(() => this.breweryDropDownList = this.beerService.getDropDownList());
  }

  onTasteSelectChange(item: any[]) {
    this.beerService.viewModel.taste = item;
  }

  onBrewTypeSelectChange(item: any[]) {
    this.beerService.viewModel.brewType = item;
  }

  onBrewerySelectChange(item: DropDownEntry) {
    if (isUndefined(this.beerService.viewModel.brewery)) {
      //this.beerService.viewModel.brewery = new Brewery()
    }
    this.beerService.viewModel.brewery = item[0].id;
    //todo update brewery
    //this.beerService.viewModel.brewery.name = item[0].itemName;
  }
}
