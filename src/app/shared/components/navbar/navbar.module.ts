import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar.component';
import { FormFilterModule } from '../form-filter/form-filter.module';

@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    FormFilterModule,
  ],
  exports:[
    NavbarComponent,
  ]
})
export class NavbarModule { }
