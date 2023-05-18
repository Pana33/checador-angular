import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { EmployeeDb } from 'src/app/shared/models/type-person/type-person';

@Component({
  selector: 'app-modal-form-employee',
  templateUrl: './modal-form-employee.component.html',
  styleUrls: ['./modal-form-employee.component.scss']
})
export class ModalFormEmployeeComponent implements OnInit, OnDestroy {

  constructor(private fb:FormBuilder,private emitter:EmittersService){}

  formAddEmployee!:FormGroup
  operation:string = ""
  subEmployeeToEdit!:Subscription
  headerModalEmployee!:string

  ngOnInit(): void {
    this.initForm()
    this.subEmployeeToEdit = this.emitter.activeModal.subscribe((resEmployee:EmployeeDb)=>{
      if(typeof(resEmployee)=="string"){
        this.headerModalEmployee = "Agregar empleado"
        this.operation = "add"
      }else{
        this.headerModalEmployee = "Editar empleado"
        this.operation = "update"
        this.initForm(resEmployee.firstName,resEmployee.lastName,resEmployee.emailEmployee,resEmployee.curp)
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

  addEmploye(){
    //Crear funcion para recibir la data y crear el empleado
    if(this.operation == "add"){
      console.log("Agregando: ",this.formAddEmployee.value)
    }else if(this.operation = "update"){
      console.log("Editando: ",this.formAddEmployee.value)
    }
  }

  ngOnDestroy(): void {
    this.subEmployeeToEdit?.unsubscribe()
  }

}
