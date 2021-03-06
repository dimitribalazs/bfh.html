import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class TasteMultiSelectComponent implements OnInit {
  //moved, because two way data binding cannot be used in forms
  @Input() selectedItems;
  @Input() dropdownList;
  @Input() ItemName: String;
  @Input() singleSelection: boolean;
  @Output() onSelectChange = new EventEmitter();

  dropdownSettings = {};

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: this.singleSelection,
      text: 'Select ' + this.ItemName,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
  }

  onItemSelect(item: any) {
    this.onSelectChange.emit(this.selectedItems);
  }

  OnItemDeSelect(item: any) {
    this.onSelectChange.emit(this.selectedItems);
  }

  onSelectAll(items: any) {
    this.onSelectChange.emit(this.selectedItems);
  }

  onDeSelectAll(items: any) {
    this.onSelectChange.emit(this.selectedItems);
  }
}
