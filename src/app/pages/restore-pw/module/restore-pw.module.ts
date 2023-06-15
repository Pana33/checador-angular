import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestorePwRoutingModule } from './restore-pw-routing.module';
import { RestorePwComponent } from '../restore-pw.component';


@NgModule({
  declarations: [
    RestorePwComponent,
  ],
  imports: [
    CommonModule,
    RestorePwRoutingModule
  ]
})
export class RestorePwModule { }
