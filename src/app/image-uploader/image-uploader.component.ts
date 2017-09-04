import { Component, OnInit, Input } from '@angular/core';
import {MenuService} from '../shared/services/menu.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
  @Input() titleDetail: String;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.setDefault();
    this.menuService.TitleText = this.titleDetail + ' image upload';
    this.menuService.visibleBack = true;
  }

}
