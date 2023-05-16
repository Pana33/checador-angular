import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database/database.service';
import { TablesDb } from 'src/app/shared/models/tables-db/tables-db';
import { EmployeeDb } from 'src/app/shared/models/type-person/type-person';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  constructor(private db:DatabaseService){}

  headerTable = ["Nombre","Apellidos","Correo","Curp","Alta", "Acciones"]
  keyEmployees = ["firstName","lastName","emailEmployee","curp","dtCreated"]
  employeeDocuments!:EmployeeDb[]
  subEmployeeDocuments!:Subscription

  ngOnInit(): void {
    this.subEmployeeDocuments = this.db.getAllDocumentsWhitoutIdSubscribable(TablesDb.EMPLOYEES).subscribe(resEmployees=>{
      this.employeeDocuments = resEmployees as EmployeeDb[]
    })
  }

  ngOnDestroy(): void {
    this.subEmployeeDocuments?.unsubscribe()
  }

}
