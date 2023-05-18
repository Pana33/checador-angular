import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModalAddComponent } from './button-modal-add.component';

@NgModule({
  declarations: [
    ButtonModalAddComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ButtonModalAddComponent,
  ]
})
export class ButtonModalAddModule { }
