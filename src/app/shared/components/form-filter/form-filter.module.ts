import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFilterComponent } from './form-filter.component';

@NgModule({
  declarations: [
    FormFilterComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FormFilterComponent,
  ]
})
export class FormFilterModule { }
