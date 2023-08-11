import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorFormMinlengthComponent } from './error-form-minlength.component';

@NgModule({
  declarations: [
    ErrorFormMinlengthComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ErrorFormMinlengthComponent,
  ]
})
export class ErrorFormMinlengthModule { }
