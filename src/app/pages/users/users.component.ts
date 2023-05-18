import { Component } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database/database.service';
import { FilterParam } from 'src/app/shared/models/filter-param/filter-param';
import { TablesDb } from 'src/app/shared/models/tables-db/tables-db';
import { UserDb } from 'src/app/shared/models/type-person/type-person';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {


  constructor(private db: DatabaseService) { }

  headerTable = ["Nombre", "Apellidos", "Correo", "Admin", "Alta", "Acciones"]
  keyUsers = ["firstName", "lastName", "emailUser", "isAdmin", "dtCreated"]
  idData = "emailUser"
  userDocuments!: UserDb[]
  userDocumentsComplet!: UserDb[]
  subUserDocuments!: Subscription
  paramsToFilter: FilterParam | null = null

  ngOnInit(): void {
    this.subUserDocuments = this.db.getAllDocumentsWhitoutIdSubscribable(TablesDb.USERS).subscribe(resUsers => {
      this.userDocumentsComplet = resUsers as UserDb[]
      this.userDocuments = resUsers as UserDb[]
      if (this.paramsToFilter != null) {
        this.filterData(this.paramsToFilter)
      }
    })
  }

  ngOnDestroy(): void {
    this.subUserDocuments?.unsubscribe()
  }

  filterData(paramsObject: FilterParam) {
    this.paramsToFilter = paramsObject
    this.userDocuments = this.userDocumentsComplet
    if (paramsObject.filterBy != "" && paramsObject.column != "none") {
      let arrowFunctionToFilter
      if (paramsObject.exactMatch) {
        arrowFunctionToFilter = (user: UserDb) => {
          let stringToCompare = String(user[paramsObject.column as keyof UserDb])
          if (paramsObject.column == "dtCreated") {
            stringToCompare = this.formatTimestampToString(user[paramsObject.column as keyof UserDb] as Timestamp)
          }
          return stringToCompare == paramsObject.filterBy
        }
      } else {
        arrowFunctionToFilter = (user: UserDb) => {
          let stringToCompare = String(user[paramsObject.column as keyof UserDb])
          if (paramsObject.column == "dtCreated") {
            stringToCompare = this.formatTimestampToString(user[paramsObject.column as keyof UserDb] as Timestamp)
          }
          return stringToCompare.includes(paramsObject.filterBy)
        }
      }
      this.userDocuments = this.userDocuments.filter(arrowFunctionToFilter)
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
