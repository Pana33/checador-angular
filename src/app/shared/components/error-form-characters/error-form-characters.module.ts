import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorFormCharactersComponent } from './error-form-characters.component';

@NgModule({
  declarations: [
    ErrorFormCharactersComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ErrorFormCharactersComponent,
  ]
})
export class ErrorFormCharactersModule { }
