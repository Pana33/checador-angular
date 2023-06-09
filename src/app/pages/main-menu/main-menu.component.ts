import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageRoutes } from 'src/app/shared/models/page-routes/page-routes';
import { TablesDb } from 'src/app/shared/models/tables-db/tables-db';
import { UserDb } from 'src/app/shared/models/type-person/type-person';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { EmittersService } from 'src/app/services/emitters/emitters.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService, private db: DatabaseService, private router: Router,private emitter:EmittersService) { }

  readonly pages = PageRoutes
  emailUser = ""
  subEmailUser!: Subscription
  dataUser!: UserDb
  subDataUser!: Subscription
  statusSidenav:boolean = false
  subEmitterToggleSidenav!:Subscription

  ngOnInit(): void {
    this.subEmailUser = this.auth.getEmailUser().subscribe(resEmailUser => {
      if (resEmailUser != null && typeof (resEmailUser.email) == "string") {
        this.emailUser = resEmailUser.email
        this.subDataUser = this.db.getOneDocumentSubscribable(TablesDb.USERS, this.emailUser).subscribe(resDataUser => {
          this.dataUser = resDataUser as UserDb
          if (!this.dataUser.isActive) {
            //El usuario no esta activo
            this.logout()
          }
        })
      } else {
        //No encontramos su correo
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
    this.subEmailUser?.unsubscribe()
    this.subDataUser?.unsubscribe()
  }

}
