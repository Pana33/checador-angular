import { Component, OnInit, OnDestroy } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database/database.service';
import { FilterParam } from 'src/app/shared/models/filter-param/filter-param';
import { RecordEmployee } from 'src/app/shared/models/record-employee/record-employee';
import { TablesDb } from 'src/app/shared/models/tables-db/tables-db';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit, OnDestroy{

  constructor(private db:DatabaseService){}

  headerTable = ["Nombre","Email","Curp","Fecha","Tipo","Mapa"]
  keyRecords = ["fullName","emailEmployee","curp","dateTime","type"]
  recordDocuments!:RecordEmployee[]
  recordDocumentsComplet!:RecordEmployee[]
  subRecordDocuments!:Subscription
  paramsFilter:FilterParam | null = null

  ngOnInit(): void {
    this.subRecordDocuments = this.db.getAllDocumentsWhitIdSubscribable(TablesDb.RECORDS).subscribe(resRecords=>{
      this.recordDocumentsComplet = resRecords as RecordEmployee[]
      this.recordDocuments = resRecords as RecordEmployee[]
      if(this.paramsFilter != null){
        this.filterfunction(this.paramsFilter)
      }
    })
  }

  filterfunction(paramsObject:FilterParam){
    this.paramsFilter = paramsObject
    this.recordDocuments = this.recordDocumentsComplet
    if(paramsObject.column != "none" && paramsObject.filterBy != ""){
      let arrowFunctionToFilter
      if (paramsObject.exactMatch) {
        arrowFunctionToFilter = (record: RecordEmployee) => {
          let stringToCompare = String(record[paramsObject.column as keyof RecordEmployee])
          if (paramsObject.column == "dateTime") {
            stringToCompare = this.formatTimestampToString(record[paramsObject.column as keyof RecordEmployee] as Timestamp)
          }
          return stringToCompare == paramsObject.filterBy
        }
      } else {
        arrowFunctionToFilter = (record: RecordEmployee) => {
          let stringToCompare = String(record[paramsObject.column as keyof RecordEmployee])
          if (paramsObject.column == "dateTime") {
            stringToCompare = this.formatTimestampToString(record[paramsObject.column as keyof RecordEmployee] as Timestamp)
          }
          return stringToCompare.includes(paramsObject.filterBy)
        }
      }
      this.recordDocuments = this.recordDocuments.filter(arrowFunctionToFilter)
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

  ngOnDestroy(): void {
    
  }

}
