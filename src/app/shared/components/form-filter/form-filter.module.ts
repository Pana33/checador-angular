import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFilterComponent } from './form-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    FormFilterComponent,
  ]
})
export class FormFilterModule { }
