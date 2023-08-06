import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/services/user-data/user-data.service';
import { UserDb } from '../../models/type-person/type-person';
import { PageRoutes } from '../../models/page-routes/page-routes';

@Injectable({
  providedIn: 'root'
})
export class AdminUserGuard implements CanActivate {

  constructor(private userData:UserDataService,private router:Router,private activeRoute:ActivatedRoute){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((res,rej)=>{
      this.userData.getUserData().then(resData=>{
        let dataObtained = resData as UserDb
        res(this.checkPermissions(dataObtained,state))
      }).catch((errData:string)=>{
        res(this.checkPermissions(errData,state))
      })
    })
  }

  private checkPermissions(data:string | UserDb,state:RouterStateSnapshot){
    if(typeof data == "string" || data.isAdmin != "si"){
      let urlSplited = state.url.split('/')
      let url = urlSplited[urlSplited.length-2] + "/" + PageRoutes.REGISTROS
      this.router.navigate([url])
      return false
    }else{
      return true
    }
  }
  
}
