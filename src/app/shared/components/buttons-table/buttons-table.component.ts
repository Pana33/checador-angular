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
  showSpinner:boolean = false

  deletPerson(){
    this.alert.showYesNoQuestionAlert("Eliminar registro","Los datos no podran recuperarse, ¿quieres continuar?","info").then(res=>{
      this.showSpinner = true
      let keysDocument = Object.keys(this.doc)
      if(keysDocument.includes("emailEmployee")){
        this.httpResponse = this.func.deleteEmployee(this.idDoc).subscribe(resDelet=>{
          if(resDelet.estatus == "ok"){
            this.alert.showSuccessfulOperation("Empleado eliminado")
          }else{
            this.alert.showErrorOperation()
          }
          this.showSpinner = false
        })
      }else if(keysDocument.includes("emailUser")){
        this.httpResponse = this.func.deleteUser(this.idDoc).subscribe(resDelet=>{
          if(resDelet.estatus == "ok"){
            this.alert.showSuccessfulOperation("Usuario eliminado")
          }else{
            this.alert.showErrorOperation()
          }
          this.showSpinner = false
        })
      }
    })
  }

  changeValIsActive(){
    this.showSpinner = true
    let keysDocument = Object.keys(this.doc)
    if(keysDocument.includes("emailEmployee")){
      let msgAlert = this.doc.isActive?"Empleado deshabilitado":"Empleado habilitado"
      this.httpResponse = this.func.disableEnableEmployee(this.idDoc,this.doc.isActive).subscribe(resDE=>{
        if(resDE.estatus == "ok"){
          this.alert.showSuccessfulOperation(msgAlert)
        }else{
          this.alert.showErrorOperation()
        }
        this.showSpinner = false
      })
    }else if(keysDocument.includes("emailUser")){
      let msgAlert = this.doc.isActive?"Usuario deshabilitado":"Usuario habilitado"
      this.httpResponse = this.func.disableEnableUser(this.idDoc,this.doc.isActive).subscribe(resDE=>{
        if(resDE.estatus == "ok"){
          this.alert.showSuccessfulOperation(msgAlert)
        }else{
          this.alert.showErrorOperation()
        }
        this.showSpinner = false
      })
    }
  }

  updateDocument(){
    this.emitter.activeModal.emit(this.doc)
  }

  ngOnDestroy(): void {
    this.httpResponse?.unsubscribe()
  }

}
