import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {BeerBarModel} from "../../../domainModel/viewModels";
import {BarBeer} from "../../../dto/barBeer";

@Component({
  selector: 'app-link-information',
  templateUrl: './link-information.component.html',
  styleUrls: ['./link-information.component.css']
})
export class LinkInformationComponent implements OnInit {
  @Input() model
  @Output() onAddBeerBarModel = new EventEmitter<BeerBarModel>()
  submitted = false;
  // model: BeerBarModel;

  constructor() {
    // this.model = new BeerBarModel()
  }

  ngOnInit() {
  }

  onSubmit() {
    this.onAddBeerBarModel.emit(this.model)
  }

}
