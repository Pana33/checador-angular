import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageRoutes } from 'src/app/shared/models/page-routes/page-routes';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { TablesDb } from 'src/app/shared/models/tables-db/tables-db';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  constructor(private auth:AuthService,private router:Router,private fb:FormBuilder,private db:DatabaseService,private title:Title){
    this.title.setTitle("Checador empresarial")
  }
  
  formLogin!:FormGroup
  showSpinner = false
  textErrorMsg:string = ""

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      user:["",Validators.required],
      password:["",Validators.required]
    })
  }
  
  makeLogin(){
    this.showSpinner = true
    this.auth.login(this.formLogin.value.user,this.formLogin.value.password).then(resAuth=>{
      this.db.getOneDocumentOneTime(TablesDb.USERS,this.formLogin.value.user).then(resData=>{
        if(resData.exists() && resData.data()["emailUser"] == this.formLogin.value.user){
          this.router.navigate([PageRoutes.MENU])
          this.showSpinner = false
        }else{
          this.auth.logout()
          this.showErrorMsg("No hemos podido encontrar la informacion")
          this.showSpinner = false
        }
      }).catch(errData=>{
        this.showErrorMsg("No se pudo obtener el usuario")
      })
    }).catch(err=>{
      this.showSpinner = false
      this.showErrorMsg("Por favor revisa la informacion e intenta nuevamente")
    })
  }

  showErrorMsg(textError:string){
    this.textErrorMsg = textError
    let element = document.getElementById("errorLogin") as HTMLElement
    element.classList.add("show")
  }

}
