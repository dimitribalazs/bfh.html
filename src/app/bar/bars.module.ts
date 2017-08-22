import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BarComponent } from './bar.component';
import { BarDetailComponent } from './bar-detail/bar-detail.component';

import { BarsRoutingModule } from './bars-routing.module';

// import { BarService } from './bar.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BarsRoutingModule
  ],
  declarations: [
    BarComponent,
    // BarDetailComponent
  ],
  providers: [  ]
  // providers: [ BarService ]
})
export class BarsModule { }
