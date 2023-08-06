import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { DatabaseService } from '../database/database.service';
import { UserDb } from 'src/app/shared/models/type-person/type-person';
import { EmittersService } from '../emitters/emitters.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private auth:AuthService,private db:DatabaseService,private emitter:EmittersService) { }

  private emailUser:string = ""
  private subEmailUser!:Subscription
  private userData:UserDb | null = null
  private subUserData!:Subscription

  private consultEmailUser(){
    return new Promise<string>((res,rej)=>{
      this.subEmailUser = this.auth.getEmailUser().subscribe(resEmailUser => {
        if (resEmailUser != null && typeof resEmailUser?.email == "string") {
          if(this.emailUser != "" && this.emailUser != resEmailUser.email){
            this.subUserData?.unsubscribe()
            this.consultUserData(resEmailUser.email)
          }
          this.emailUser = resEmailUser.email
          res(this.emailUser)
        } else {
          this.emailUser = ""
          rej("Email not found")
        }
      })
    })
  }

  private consultUserData(email:string){
    return new Promise((res,rej)=>{
      this.subUserData = this.db.getUserData(email).subscribe(resDataUser => {
        this.emitter.userDataEmitter.emit(resDataUser as UserDb)
        if(typeof resDataUser != "undefined"){
          this.userData = resDataUser as UserDb
          res(this.userData)
        }else{
          this.userData = null
          rej("User not found")
        }
      })
    })
  }

  getEmailUser(){
    return new Promise<string>((res,rej)=>{
      if(this.emailUser != ""){
        res(this.emailUser)
      }else{
        this.consultEmailUser().then(resEmail=>{
          res(resEmail)
        }).catch(errEmail=>{
          rej(errEmail)
        })
      }
    })
  }

  getUserData(){
    return new Promise((res,rej)=>{
      if(this.userData != null){
        res(this.userData)
      }else{
        this.getEmailUser().then(resEmail=>{
          this.consultUserData(resEmail).then(resData=>{
            res(resData)
          }).catch(errData=>{
            rej(errData)
          })
        }).catch(errEmail=>{
          rej(errEmail)
        })
      }
    })
  }

  unsubscribe(){
    this.emailUser = ""
    this.userData = null
    this.subEmailUser?.unsubscribe()
    this.subUserData?.unsubscribe()
  }

}
