import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestorePwRoutingModule } from './restore-pw-routing.module';
import { RestorePwComponent } from '../restore-pw.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RestorePwComponent,
  ],
  imports: [
    CommonModule,
    RestorePwRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RestorePwModule { }
