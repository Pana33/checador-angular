import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonsTableComponent } from './buttons-table.component';

@NgModule({
  declarations: [
    ButtonsTableComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ButtonsTableComponent,
  ]
})
export class ButtonsTableModule { }
