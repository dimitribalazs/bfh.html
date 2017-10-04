import { Component, OnInit } from '@angular/core';
import { Bar } from '../../shared/dto/bar';
import { BarService } from '../barService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bar-info',
  templateUrl: './bar-info.component.html',
  styleUrls: ['./bar-info.component.css']
})
export class BarInfoComponent implements OnInit {
  private showMap = false;
  id: string;

  constructor(public barService: BarService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  onClick(childView: string, activateNavigation: number) {
    this.router.navigate(['bar', this.id, childView]);
  }
}
