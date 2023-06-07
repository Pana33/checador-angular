import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from '../locations.component';
import { FormLocationsComponent } from '../components/form-locations/form-locations.component';
import { FormFilterModule } from 'src/app/shared/components/form-filter/form-filter.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LocationsComponent,
    FormLocationsComponent,
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    FormFilterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LocationsModule { }
