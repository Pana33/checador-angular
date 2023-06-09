import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonSideMenuComponent } from './button-side-menu.component';


@NgModule({
  declarations: [
    ButtonSideMenuComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    ButtonSideMenuComponent,
  ]
})
export class ButtonSideMenuModule { }
