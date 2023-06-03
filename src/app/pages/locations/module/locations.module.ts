import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from '../locations.component';
import { FormCollapseLocationsComponent } from '../components/form-collapse-locations/form-collapse-locations.component';
import { FormFilterModule } from 'src/app/shared/components/form-filter/form-filter.module';


@NgModule({
  declarations: [
    LocationsComponent,
    FormCollapseLocationsComponent,
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    FormFilterModule,
  ]
})
export class LocationsModule { }
