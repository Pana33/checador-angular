import { Component, OnDestroy, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database/database.service';
import { FilterParam } from 'src/app/shared/models/filter-param/filter-param';
import { TablesDb } from 'src/app/shared/models/tables-db/tables-db';
import { EmployeeDb } from 'src/app/shared/models/type-person/type-person';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  constructor(private db: DatabaseService,private title:Title) {
    this.title.setTitle("Empleados")
  }

  headerTable = ["Nombre", "Apellidos", "Correo", "Curp", "Alta", "Acciones"]
  keyEmployees = ["firstName", "lastName", "emailEmployee", "curp", "dtCreated"]
  idData = "emailEmployee"
  employeeDocuments!: EmployeeDb[]
  employeeDocumentsComplet!: EmployeeDb[]
  subEmployeeDocuments!: Subscription
  paramsToFilter: FilterParam | null = null

  ngOnInit(): void {
    this.subEmployeeDocuments = this.db.getAllDocumentsWhitoutIdSubscribable(TablesDb.EMPLOYEES).subscribe(resEmployees => {
      this.employeeDocumentsComplet = resEmployees as EmployeeDb[]
      this.employeeDocuments = resEmployees as EmployeeDb[]
      if (this.paramsToFilter != null) {
        this.filterData(this.paramsToFilter)
      }
    })
  }

  ngOnDestroy(): void {
    this.subEmployeeDocuments?.unsubscribe()
  }

  filterData(paramsObject: FilterParam) {
    this.paramsToFilter = paramsObject
    this.employeeDocuments = this.employeeDocumentsComplet
    if (paramsObject.filterBy != "" && paramsObject.column != "none") {
      let arrowFunctionToFilter
      if (paramsObject.exactMatch) {
        arrowFunctionToFilter = (employee: EmployeeDb) => {
          let stringToCompare = String(employee[paramsObject.column as keyof EmployeeDb])
          if (paramsObject.column == "dtCreated") {
            stringToCompare = this.formatTimestampToString(employee[paramsObject.column as keyof EmployeeDb] as Timestamp)
          }
          return stringToCompare == paramsObject.filterBy
        }
      } else {
        arrowFunctionToFilter = (employee: EmployeeDb) => {
          let stringToCompare = String(employee[paramsObject.column as keyof EmployeeDb])
          if (paramsObject.column == "dtCreated") {
            stringToCompare = this.formatTimestampToString(employee[paramsObject.column as keyof EmployeeDb] as Timestamp)
          }
          return stringToCompare.includes(paramsObject.filterBy)
        }
      }
      this.employeeDocuments = this.employeeDocuments.filter(arrowFunctionToFilter)
    }
  }

  formatTimestampToString(timestampInSeconds: Timestamp) {
    let checkLength = (string: string) => string.length == 1 ? "0" + string : string
    let date = new Date(timestampInSeconds.seconds * 1000)
    let day = checkLength(String(date.getDate()))
    let mont = checkLength(String(date.getMonth() + 1))
    let year = String(date.getFullYear())
    return day + "-" + mont + "-" + year
  }

}
