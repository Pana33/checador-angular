import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageRoutes } from 'src/app/models/page-routes/page-routes';
import { TablesDb } from 'src/app/models/tables-db/tables-db';
import { UserDb } from 'src/app/models/type-person/type-person';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService, private db: DatabaseService, private router: Router) { }

  readonly pages = PageRoutes
  emailUser = ""
  subEmailUser!: Subscription
  dataUser!: UserDb
  subDataUser!: Subscription

  ngOnInit(): void {
    this.subEmailUser = this.auth.getEmailUser().subscribe(resEmailUser => {
      if (resEmailUser != null && typeof (resEmailUser.email) == "string") {
        this.emailUser = resEmailUser.email
        this.subDataUser = this.db.getOneDocumentSubscribable(TablesDb.USUARIOS, this.emailUser).subscribe(resDataUser => {
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
