import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/services/user-data/user-data.service';
import { UserDb } from '../../models/type-person/type-person';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserActiveGuard implements CanMatch {

  constructor(private userData:UserDataService,private auth:AuthService){}

  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((res,rej)=>{
      this.userData.getUserData().then(resData=>{
        let dataObtained = resData as UserDb
        res(this.checkActiveUser(dataObtained))
      }).catch((errData:string)=>{
        res(this.checkActiveUser(errData))
      })
    })
  }

  private checkActiveUser(data:string | UserDb){
    if(typeof data == "string" || data.isActive != true){
      this.userData.unsubscribe()
      this.auth.logout()
      return false
    }
    return true
  }

}
