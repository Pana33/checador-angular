import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { PageRoutes } from 'src/app/shared/models/page-routes/page-routes';
import { TablesDb } from 'src/app/shared/models/tables-db/tables-db';

@Component({
  selector: 'app-restore-pw',
  templateUrl: './restore-pw.component.html',
  styleUrls: ['./restore-pw.component.scss']
})
export class RestorePwComponent implements OnInit{

  constructor(private fb:FormBuilder,
    private auth:AuthService,
    private router:Router,
    private alert:AlertsService,
    private activeRoute:ActivatedRoute,
    private db:DatabaseService){}

  formRestorePw!:FormGroup
  showSpinner:boolean = false
  validLinkToRestorePw!:boolean
  textAlertMsg:string = ""
  oobCode:string = ""
  tableDb:string = ""
  idDocument:string = ""
  pageLogin = PageRoutes.LOGIN

  ngOnInit(): void {
    this.formRestorePw = this.fb.group({
      pass1:["",Validators.required],
      pass2:["",Validators.required]
    })
    this.activeRoute.queryParams.subscribe(resParam=>{
      this.oobCode = resParam["oobCode"]
      this.auth.checkCodeOob(this.oobCode).then(resCheck=>{
        this.idDocument = resCheck.data.email!
        this.db.getOneDocumentOneTime(TablesDb.USERS,resCheck.data.email!).then(resDb=>{
          if(resDb.exists()){
            this.tableDb = TablesDb.USERS
            this.validLinkToRestorePw = true
          }else{
            this.tableDb = TablesDb.EMPLOYEES
            this.validLinkToRestorePw = true
          }
        })
      }).catch(errCheck=>{
        this.validLinkToRestorePw = false
      })
    })
  }

  changePw(){
    this.showSpinner = true
    if(this.formRestorePw.value.pass1 == this.formRestorePw.value.pass2){
      this.auth.changePw(this.oobCode,this.formRestorePw.value.pass1).then(resChange=>{
        this.db.updateDocument(this.tableDb,this.idDocument,{changePw:false}).then(resDb=>{
          this.alert.showSuccessfulOperation("Cambio exitoso")
          this.showSpinner = false
          this.router.navigate([PageRoutes.LOGIN])
        })
      }).catch(errChange=>{
        this.showSpinner = false
        this.alert.showErrorOperation("Intenta nuevamente","No hemos podido cambiar la contraseña","error")
      })
    }else{
      this.showMsg("Las contraseñas no coinciden")
      this.showSpinner = false
    }
  }

  showMsg(textMsg:string){
    this.textAlertMsg = textMsg
    let element = document.getElementById("msgInfo") as HTMLElement
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
