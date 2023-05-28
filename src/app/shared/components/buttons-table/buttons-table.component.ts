import { Component, Input, OnDestroy } from '@angular/core';
import { EmployeeDb, UserDb } from '../../models/type-person/type-person';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { TablesDb } from '../../models/tables-db/tables-db';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { FunctionsApiService } from 'src/app/services/functions-api/functions-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buttons-table',
  templateUrl: './buttons-table.component.html',
  styleUrls: ['./buttons-table.component.scss']
})
export class ButtonsTableComponent implements OnDestroy {
  @Input() status!:boolean | null
  @Input() idDoc!:string
  @Input() doc!:EmployeeDb | UserDb

  constructor(private emitter:EmittersService,private db:DatabaseService,private alert:AlertsService,private func:FunctionsApiService){}
  
  httpResponse!:Subscription

  deletPerson(){
    this.alert.showYesNoQuestionAlert("Eliminar registro","Los datos no podran recuperarse, ¿quieres continuar?","info").then(res=>{
      let keysDocument = Object.keys(this.doc)
      if(keysDocument.includes("emailEmployee")){
        this.db.deletDocument(TablesDb.EMPLOYEES,this.idDoc).then(resDelEmployee=>{
          this.alert.showSuccessfulOperation()
        }).catch(err=>{
          this.alert.showErrorOperation()
        })
      }else if(keysDocument.includes("emailUser")){
        this.db.deletDocument(TablesDb.USERS,this.idDoc).then(resDelUser=>{
          this.alert.showSuccessfulOperation()
        }).catch(err=>{
          this.alert.showErrorOperation()
        })
      }
    })
  }

  changeValIsActive(){
    let keysDocument = Object.keys(this.doc)
    if(keysDocument.includes("emailEmployee")){
      let msgAlert = this.doc.isActive?"Empleado deshabilitado":"Empleado habilitado"
      this.db.activeOrInactivePerson(TablesDb.EMPLOYEES,this.idDoc,!this.doc.isActive).then(resUpdateEmployee=>{
        this.alert.showSuccessfulOperation(msgAlert)
      }).catch(err=>{
        this.alert.showErrorOperation()
      })
    }else if(keysDocument.includes("emailUser")){
      let msgAlert = this.doc.isActive?"Usuario deshabilitado":"Usuario habilitado"
      this.httpResponse = this.func.disableEnableUser(this.doc as UserDb).subscribe(resDE=>{
        console.log(resDE)
        if(resDE.estatus == "ok"){
          this.alert.showSuccessfulOperation(msgAlert)
        }else{
          this.alert.showErrorOperation()
        }
      })
      // this.db.activeOrInactivePerson(TablesDb.USERS,this.idDoc,!this.doc.isActive).then(resUpdateUser=>{
      //   this.alert.showSuccessfulOperation(msgAlert)
      // }).catch(err=>{
      //   this.alert.showErrorOperation()
      // })
    }
  }

  updateDocument(){
    this.emitter.activeModal.emit(this.doc)
  }

  ngOnDestroy(): void {
    this.httpResponse?.unsubscribe()
  }

}
