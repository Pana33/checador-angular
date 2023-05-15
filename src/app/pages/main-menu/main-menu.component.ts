import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService, private db: DatabaseService, private router: Router) { }

  emailUser = ""
  subEmailUser!: Subscription
  dataUser!: DocumentData
  subDataUser!: Subscription

  ngOnInit(): void {
    this.subEmailUser = this.auth.getEmailUser().subscribe(resEmailUser => {
      if (resEmailUser != null && typeof (resEmailUser.email) == "string") {
        this.emailUser = resEmailUser.email
        this.subDataUser = this.db.getOneDocumentSubscribable("Users", this.emailUser).subscribe(resDataUser => {
          this.dataUser = resDataUser
          if (!this.dataUser["isActive"]) {
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
    this.router.navigate(['/login'])
  }

  ngOnDestroy(): void {
    this.subEmailUser?.unsubscribe()
    this.subDataUser?.unsubscribe()
  }

}
