import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from '../records.component';
import { TableRecordsComponent } from '../components/table-records/table-records.component';
import { ModelMapsComponent } from '../components/model-maps/model-maps.component';
import { ButtonSideMenuModule } from 'src/app/shared/components/button-side-menu/button-side-menu.module';
import { FormFilterModule } from 'src/app/shared/components/form-filter/form-filter.module';

@NgModule({
  declarations: [
    RecordsComponent,
    TableRecordsComponent,
    ModelMapsComponent,
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    FormFilterModule,
    ButtonSideMenuModule,
  ]
})
export class RecordsModule { }
