import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { FunctionsApiService } from 'src/app/services/functions-api/functions-api.service';
import { UserDb } from 'src/app/shared/models/type-person/type-person';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrls: ['./modal-form-user.component.scss']
})
export class ModalFormUserComponent {

  constructor(private fb:FormBuilder,private emitter:EmittersService,private func:FunctionsApiService){}

  formAddUser!:FormGroup
  operation:string = ""
  subUserToEdit!:Subscription
  headerModalUser!:string
  httpResponse:Subscription | null = null

  ngOnInit(): void {
    this.initForm()
    this.subUserToEdit = this.emitter.activeModal.subscribe((resUser:UserDb)=>{
      if(typeof(resUser)=="string"){
        this.headerModalUser = "Agregar usuario"
        this.operation = "add"
      }else{
        this.headerModalUser = "Editar usuario"
        this.operation = "update"
        this.initForm(resUser.firstName,resUser.lastName,resUser.emailUser,resUser.isAdmin)
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
    //Crear funcion para recibir la data y crear el empleado
    if(this.operation == "add"){
      this.httpResponse = this.func.addUser(this.formAddUser.value).subscribe(resFunc =>{
        console.log(resFunc)
      })
      // console.log("Agregando: ",this.formAddUser.value)
    }else if(this.operation = "update"){
      console.log("Editando: ",this.formAddUser.value)
    }
  }

  ngOnDestroy(): void {
    this.subUserToEdit?.unsubscribe()
    this.httpResponse?.unsubscribe()
  }

}
