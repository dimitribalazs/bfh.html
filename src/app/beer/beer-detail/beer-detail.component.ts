import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Beer, DropDownlists} from '../../shared/dto/beer';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {BierService} from '../beerService'
import {MenuService} from '../../shared/services/menu.service';
import {isUndefined} from "util";

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['../beer.component.css']
})
export class BeerDetailComponent implements OnInit {

  model: Beer = new Beer;
  public submitted: boolean = false;
  public formErrorMessage: boolean = false;
  dropDownlists = new DropDownlists()



  constructor(private beerService: BierService, private menuService: MenuService, private router: Router) {

  }
  @Input() selectedItems;
  @Output() onSelectChange = new EventEmitter<any>();

  ngOnInit() {
    this.menuService.setDefault();
    this.menuService.TitleText = 'Enter or edit beer info'
    this.menuService.visibleSave = true;
    this.menuService.visibleBack = true;
    this.menuService.submitCallback = () => {

      if (isUndefined(this.model.name) || this.model.name.length === 0 ||
        isUndefined(this.model.description) || this.model.description.length === 0) {
        this.formErrorMessage = true;
      } else {
        this.beerService.submit();
        this.submitted = true;
        this.formErrorMessage = false;
        this.router.navigate(['beer/', this.model.id]);
      }
    }
    this.beerService.getBeer().subscribe((beer) => {
      this.model = this.beerService.getViewModel();
    })
  }

  onTasteSelectChange(item: any[]) {
    this.model.taste = item;
  }

  onBrewTypeSelectChange(item: any[]) {
    this.model.brewType = item;
  }
  onItemSelect(item: any) {
    this.onSelectChange.emit(this.selectedItems);
  }
}
