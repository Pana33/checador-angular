import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { FunctionsApiService } from 'src/app/services/functions-api/functions-api.service';
import { TablesDb } from 'src/app/shared/models/tables-db/tables-db';
import { UserDb } from 'src/app/shared/models/type-person/type-person';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrls: ['./modal-form-user.component.scss']
})
export class ModalFormUserComponent {

  constructor(private fb:FormBuilder,
    private emitter:EmittersService,
    private func:FunctionsApiService,
    private alert:AlertsService,
    private db:DatabaseService){}

  formAddUser!:FormGroup
  operation:string = ""
  subUserToEdit!:Subscription
  headerModalUser!:string
  httpResponse:Subscription | null = null
  emailUser:string = ""
  showSpinner:boolean = false

  ngOnInit(): void {
    this.initForm()
    this.subUserToEdit = this.emitter.activeModal.subscribe((resUser:UserDb)=>{
      if(typeof(resUser)=="string"){
        this.headerModalUser = "Agregar usuario"
        this.operation = "add"
        this.emailUser = ""
        this.formAddUser.get("emailUser")?.enable()
      }else{
        this.headerModalUser = "Editar usuario"
        this.operation = "update"
        this.emailUser = resUser.emailUser
        this.initForm(resUser.firstName,resUser.lastName,resUser.emailUser,resUser.isAdmin)
        this.formAddUser.get("emailUser")?.disable()
      }
    })
  }

  initForm(firstName?:string,lastName?:string,emailUser?:string,isAdmin?:string){
    this.formAddUser = this.fb.group({
      firstName:[firstName,[Validators.required]],
      lastName:[lastName,[Validators.required]],
      emailUser:[emailUser,[Validators.required]],
      isAdmin:[isAdmin,[Validators.required]],
    })
  }

  addOrUpdateUser(){
    this.showSpinner = true
    if(this.operation == "add"){
      this.httpResponse = this.func.addUser(this.formAddUser.value).subscribe(resFunc =>{
        if(resFunc.estatus == "ok"){
          this.alert.showSuccessfulOperation()
          this.formAddUser.reset()
          document.getElementById("closeButton")?.click()
        }else{
          this.alert.showErrorOperation()
        }
        this.showSpinner = false
      })
    }else if(this.operation = "update"){
      let makeFullName = {
        fullName:this.formAddUser.value.firstName + " " + this.formAddUser.value.lastName
      }
      let dataToFirebase = {...this.formAddUser.value,...makeFullName}
      delete dataToFirebase.emailUser
      this.db.updateDocument(TablesDb.USERS,this.emailUser,dataToFirebase).then(resUpdate=>{
        this.alert.showSuccessfulOperation()
        this.formAddUser.reset()
        this.showSpinner = false
        document.getElementById("closeButton")?.click()
      }).catch(errUpdate=>{
        this.alert.showErrorOperation()
        this.showSpinner = false
      })
    }
  }

  ngOnDestroy(): void {
    this.subUserToEdit?.unsubscribe()
    this.httpResponse?.unsubscribe()
  }

}
