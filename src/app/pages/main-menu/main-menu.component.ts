import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageRoutes } from 'src/app/shared/models/page-routes/page-routes';
import { UserDb } from 'src/app/shared/models/type-person/type-person';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService, private userData: UserDataService, private router: Router,private emitter:EmittersService) { }

  readonly pages = PageRoutes
  savedData!: UserDb
  subSavedData!: Subscription
  statusSidenav:boolean = false
  subEmitterToggleSidenav!:Subscription

  ngOnInit(): void {
    this.userData.getUserData().then(resData=>{
      this.savedData = resData as UserDb
    }).catch(err=>{
      this.logout()
    })
    this.emitter.userDataEmitter.subscribe(resUser=>{
      if(typeof resUser != "undefined"){
        this.savedData = resUser
      }
      if(typeof resUser == "undefined" || resUser?.isActive != true){
        this.logout()
      }
    })
    this.subEmitterToggleSidenav = this.emitter.togglerSidenav.subscribe(res=>{
      let sidenav = document.getElementById("sideNav") as HTMLElement
      if(this.statusSidenav == false){
        sidenav.style.marginLeft = "0px"
      }else{
        sidenav.style.removeProperty("margin-left")
      }
      this.statusSidenav = !this.statusSidenav
    })
  }

  logout() {
    this.auth.logout()
    this.router.navigate([PageRoutes.LOGIN])
  }

  ngOnDestroy(): void {
    this.subSavedData?.unsubscribe()
    this.userData.unsubscribe()
  }

}
