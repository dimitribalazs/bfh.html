import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../shared/services/menu.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent {
  @Input() titleDetail: String;

  constructor(private menuService: MenuService) { }
}
