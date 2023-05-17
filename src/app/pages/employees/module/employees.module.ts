import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from '../employees.component';
import { ModalFormEmployeeComponent } from '../components/modal-form-employee/modal-form-employee.component';

import { TableModule } from 'src/app/shared/components/table/table.module';
import { NavbarModule } from 'src/app/shared/components/navbar/navbar.module';

@NgModule({
  declarations: [
    EmployeesComponent,
    ModalFormEmployeeComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    TableModule,
    NavbarModule,
  ]
})
export class EmployeesModule { }
