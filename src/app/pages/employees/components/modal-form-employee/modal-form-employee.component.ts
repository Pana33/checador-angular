import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { FunctionsApiService } from 'src/app/services/functions-api/functions-api.service';
import { TablesDb } from 'src/app/shared/models/tables-db/tables-db';
import { EmployeeDb } from 'src/app/shared/models/type-person/type-person';

@Component({
  selector: 'app-modal-form-employee',
  templateUrl: './modal-form-employee.component.html',
  styleUrls: ['./modal-form-employee.component.scss']
})
export class ModalFormEmployeeComponent implements OnInit, OnDestroy {

  constructor(private fb:FormBuilder,
    private emitter:EmittersService,
    private func:FunctionsApiService,
    private alert:AlertsService,
    private db:DatabaseService){}

  formAddEmployee!:FormGroup
  operation:string = ""
  subEmployeeToEdit!:Subscription
  headerModalEmployee!:string
  httpResponse:Subscription | null = null
  emailEmployee:string = ""
  showSpinner:boolean = false

  ngOnInit(): void {
    this.initForm()
    this.subEmployeeToEdit = this.emitter.activeModal.subscribe((resEmployee:EmployeeDb)=>{
      if(typeof(resEmployee)=="string"){
        this.headerModalEmployee = "Agregar empleado"
        this.operation = "add"
        this.emailEmployee = ""
        this.formAddEmployee.get("emailEmployee")?.enable()
      }else{
        this.headerModalEmployee = "Editar empleado"
        this.operation = "update"
        this.emailEmployee = resEmployee.emailEmployee
        this.initForm(resEmployee.firstName,resEmployee.lastName,resEmployee.emailEmployee,resEmployee.curp)
        this.formAddEmployee.get("emailEmployee")?.disable()
      }
    })
  }

  initForm(firstName?:string,lastName?:string,emailEmployee?:string,curp?:string){
    this.formAddEmployee = this.fb.group({
      firstName:[firstName,[Validators.required]],
      lastName:[lastName,[Validators.required]],
      emailEmployee:[emailEmployee,[Validators.required]],
      curp:[curp,[Validators.required]],
    })
  }

  addOrUpdateEmploye(){
    this.showSpinner = true
    if(this.operation == "add"){
      this.httpResponse = this.func.addEmployee(this.formAddEmployee.value).subscribe(resFunc=>{
        if(resFunc.estatus == "ok"){
          this.alert.showSuccessfulOperation()
        }else{
          this.alert.showErrorOperation()
        }
        this.showSpinner = false
      })
    }else if(this.operation = "update"){
      let makeFullName = {
        fullName:this.formAddEmployee.value.firstName + " " + this.formAddEmployee.value.lastName
      }
      let dataToFirebase = {...this.formAddEmployee.value,...makeFullName}
      delete dataToFirebase.emailEmployee
      this.db.updateDocument(TablesDb.EMPLOYEES,this.emailEmployee,dataToFirebase).then(resUpdate=>{
        this.alert.showSuccessfulOperation()
        this.showSpinner = false
      }).catch(errUpdate=>{
        this.alert.showErrorOperation()
        this.showSpinner = false
      })
    }
  }

  ngOnDestroy(): void {
    this.subEmployeeToEdit?.unsubscribe()
    this.httpResponse?.unsubscribe()
  }

}
