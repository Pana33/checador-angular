import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from '../locations.component';
import { FormFilterModule } from 'src/app/shared/components/form-filter/form-filter.module';
import { ButtonSideMenuModule } from 'src/app/shared/components/button-side-menu/button-side-menu.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsApiService } from 'src/app/services/google-maps-api/google-maps-api.service';


@NgModule({
  declarations: [
    LocationsComponent,
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    FormFilterModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonSideMenuModule,
  ],
  providers:[
    GoogleMapsApiService,
  ]
})
export class LocationsModule { }
