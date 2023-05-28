import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from '../users.component';
import { ModalFormUserComponent } from '../components/modal-form-user/modal-form-user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { FormFilterModule } from 'src/app/shared/components/form-filter/form-filter.module';
import { ButtonModalAddModule } from 'src/app/shared/components/button-modal-add/button-modal-add.module';
import { HttpClientModule } from '@angular/common/http';
import { FunctionsApiService } from 'src/app/services/functions-api/functions-api.service';

@NgModule({
  declarations: [
    UsersComponent,
    ModalFormUserComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    FormFilterModule,
    ButtonModalAddModule,
    HttpClientModule,
  ],
  providers:[
    FunctionsApiService,
  ]
})
export class UsersModule { }
