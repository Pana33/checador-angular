import { Component, Input } from '@angular/core';
import { EmployeeDb, UserDb } from '../../models/type-person/type-person';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { TablesDb } from '../../models/tables-db/tables-db';

@Component({
  selector: 'app-buttons-table',
  templateUrl: './buttons-table.component.html',
  styleUrls: ['./buttons-table.component.scss']
})
export class ButtonsTableComponent {
  @Input() status!:boolean | null
  @Input() idDoc!:string
  @Input() doc!:EmployeeDb | UserDb

  constructor(private emitter:EmittersService,private db:DatabaseService){}
  
  deletPerson(){
    //Falta agregar algun mensaje de error en caso de que falle la eliminacion
    let keysDocument = Object.keys(this.doc)
    if(keysDocument.includes("emailEmployee")){
      this.db.deletDocument(TablesDb.EMPLOYEES,this.idDoc).catch(err=>{
        console.log("No se pudo eliminar el registro: ",err)
      })
    }else if(keysDocument.includes("emailUser")){
      this.db.deletDocument(TablesDb.USERS,this.idDoc).catch(err=>{
        console.log("No se pudo eliminar el registro: ",err)
      })
    }
  }

  changeValIsActive(){
    //Falta agregar algun mensaje de error en caso de que falle la actualizacion
    let keysDocument = Object.keys(this.doc)
    if(keysDocument.includes("emailEmployee")){
      this.db.activeOrInactivePerson(TablesDb.EMPLOYEES,this.idDoc,!this.doc.isActive).catch(err=>{
        console.log("No se pudo actualizar el estatus: ",err)
      })
    }else if(keysDocument.includes("emailUser")){
      this.db.activeOrInactivePerson(TablesDb.USERS,this.idDoc,!this.doc.isActive).catch(err=>{
        console.log("No se pudo actualizar el estatus: ",err)
      })
    }
  }

  updateDocument(){
    this.emitter.activeModal.emit(this.doc)
  }

}
