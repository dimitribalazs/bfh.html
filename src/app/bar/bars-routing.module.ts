import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarComponent } from './bar.component';
import { BarInfoComponent } from './bar-info/bar-info.component';
import { AvailableBeersComponent } from './available-beers/available-beers.component';
import { OpeningHoursComponent } from './opening-hours/opening-hours.component';
import { PhotosComponent } from './photos/photos.component';
import { MapComponent } from './map/map.component';
import { AuthGuard } from '../shared/_guards/AuthGuard';

const barsRoutes: Routes = [
  {
    path: 'bar/:id',
    component: BarComponent, canActivate: [AuthGuard],
    data: {
      type: 'info'
    },
    children: [
      {
        path: '',
        children: [
          { path: '', component: BarInfoComponent },
          { path: 'beers', component: AvailableBeersComponent },
          { path: 'info', component: BarInfoComponent },
          { path: 'openingHours', component: OpeningHoursComponent },
          { path: 'photos', component: PhotosComponent },
          { path: 'map', component: MapComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(barsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BarsRoutingModule { }
