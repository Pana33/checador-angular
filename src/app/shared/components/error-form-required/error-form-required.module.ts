import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorFormRequiredComponent } from './error-form-required.component';

@NgModule({
  declarations: [
    ErrorFormRequiredComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ErrorFormRequiredComponent,
  ]
})
export class ErrorFormRequiredModule { }
