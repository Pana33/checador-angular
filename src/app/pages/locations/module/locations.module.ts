import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from '../locations.component';
import { FormCollapseLocationsComponent } from '../components/form-collapse-locations/form-collapse-locations.component';


@NgModule({
  declarations: [
    LocationsComponent,
    FormCollapseLocationsComponent,
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule
  ]
})
export class LocationsModule { }
