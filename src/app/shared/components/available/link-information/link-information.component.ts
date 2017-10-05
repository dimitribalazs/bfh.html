import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BeerBarModel} from "../../../domainModel/viewModels";

@Component({
  selector: 'app-link-information',
  templateUrl: './link-information.component.html',
  styleUrls: ['./link-information.component.css']
})
export class LinkInformationComponent {
  @Input() model
  @Output() onAddBeerBarModel = new EventEmitter<BeerBarModel>()
  submitted = false;

  onSubmit() {
    this.onAddBeerBarModel.emit(this.model)
  }
}
