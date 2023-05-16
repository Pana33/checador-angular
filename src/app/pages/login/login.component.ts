import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageRoutes } from 'src/app/shared/models/page-routes/page-routes';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  constructor(private auth:AuthService,private router:Router,private fb:FormBuilder){}
  
  formLogin!:FormGroup
  showSpinner = false

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      user:["",Validators.required],
      password:["",Validators.required]
    })
  }
  
  makeLogin(){
    this.showSpinner = true
    this.auth.login(this.formLogin.value.user,this.formLogin.value.password).then(res=>{
      this.router.navigate([PageRoutes.MENU])
      this.showSpinner = false
    }).catch(err=>{
      this.showSpinner = false
      let element = document.getElementById("errorLogin") as HTMLElement
      element.classList.add("show")
    })
  }

}
