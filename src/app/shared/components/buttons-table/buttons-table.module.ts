import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonsTableComponent } from './buttons-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FunctionsApiService } from 'src/app/services/functions-api/functions-api.service';

@NgModule({
  declarations: [
    ButtonsTableComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports:[
    ButtonsTableComponent,
  ],
  providers:[
    FunctionsApiService,
  ]
})
export class ButtonsTableModule { }
