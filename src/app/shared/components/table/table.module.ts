import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { ButtonsTableModule } from '../buttons-table/buttons-table.module';

@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    CommonModule,
    ButtonsTableModule,
  ],
  exports:[
    TableComponent,
  ]
})
export class TableModule { }
