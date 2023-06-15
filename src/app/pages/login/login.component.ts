import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageRoutes } from 'src/app/shared/models/page-routes/page-routes';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { TablesDb } from 'src/app/shared/models/tables-db/tables-db';
import { Title } from '@angular/platform-browser';
import { IdElementHtmlMsg } from './models/id-element-html-msg';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  constructor(private auth:AuthService,
    private router:Router,
    private fb:FormBuilder,
    private db:DatabaseService,
    private title:Title){
    this.title.setTitle("Checador empresarial")
  }
  
  formLogin!:FormGroup
  showSpinnerLogin:boolean = false
  showSpinnerResetPw:boolean = false
  textErrorMsg:string = ""
  textRestorePwMsg:string = ""

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      user:["",Validators.required],
      password:["",Validators.required]
    })
  }
  
  makeLogin(){
    this.showSpinnerLogin = true
    this.auth.login(this.formLogin.value.user,this.formLogin.value.password).then(resAuth=>{
      this.db.getOneDocumentOneTime(TablesDb.USERS,this.formLogin.value.user).then(resData=>{
        if(resData.exists() && resData.data()["emailUser"] == this.formLogin.value.user){
          this.router.navigate([PageRoutes.MENU])
          this.showSpinnerLogin = false
        }else{
          this.auth.logout()
          this.showMsg(IdElementHtmlMsg.ERROR_MSG,"No hemos podido encontrar la informacion")
          this.showSpinnerLogin = false
        }
      }).catch(errData=>{
        this.showMsg(IdElementHtmlMsg.ERROR_MSG,"No se pudo obtener el usuario")
      })
    }).catch(err=>{
      this.showSpinnerLogin = false
      this.showMsg(IdElementHtmlMsg.ERROR_MSG,"Por favor revisa la informacion e intenta nuevamente")
    })
  }

  restorePw(){
    this.showSpinnerResetPw = true
    if(this.formLogin.value.user != ""){
      this.auth.restorePw(this.formLogin.value.user).then(resRestore=>{
        this.showSpinnerResetPw = false
        this.showMsg(IdElementHtmlMsg.PW_MSG,"Se envio un link para restablecer la contraseña al correo ingresado",)
      }).catch(errRestore=>{
        this.showSpinnerResetPw = false
        this.showMsg(IdElementHtmlMsg.PW_MSG,"No hemos podido enviar el correo de restablecimiento, por favor intenta nuevamente")
      })
    }else{
      this.showSpinnerResetPw = false
      this.showMsg(IdElementHtmlMsg.PW_MSG,"Debes ingresar un correo electronico")
    }
  }

  showMsg(idElementHTML:string,textMsg:string){
    if(idElementHTML == IdElementHtmlMsg.ERROR_MSG){
      this.textErrorMsg = textMsg
    }else{
      this.textRestorePwMsg = textMsg
    }
    let element = document.getElementById(idElementHTML) as HTMLElement
    element.classList.remove("d-none")
    element.classList.add("show")
    element.style.opacity = "100"
    setTimeout(this.hideMsg,5000,element)
  }

  hideMsg(elementHTML:HTMLElement){
    elementHTML.style.opacity = "0"
    setTimeout(exitMsg,500)
    function exitMsg(){
      elementHTML.classList.remove("show")
      elementHTML.classList.add("d-none")
    }
  }

}
