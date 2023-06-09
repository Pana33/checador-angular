import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from '../employees.component';
import { ModalFormEmployeeComponent } from '../components/modal-form-employee/modal-form-employee.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonSideMenuModule } from 'src/app/shared/components/button-side-menu/button-side-menu.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { FormFilterModule } from 'src/app/shared/components/form-filter/form-filter.module';
import { ButtonModalAddModule } from 'src/app/shared/components/button-modal-add/button-modal-add.module';

@NgModule({
  declarations: [
    EmployeesComponent,
    ModalFormEmployeeComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    FormFilterModule,
    ButtonModalAddModule,
    ButtonSideMenuModule,
  ]
})
export class EmployeesModule { }
