import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, user, signOut, sendPasswordResetEmail } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: Auth) { }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.afAuth, email, password)
  }

  getEmailUser() {
    return user(this.afAuth)
  }

  logout() {
    return signOut(this.afAuth)
  }

  restorePw(email:string){
    return sendPasswordResetEmail(this.afAuth,email)
  }

}
