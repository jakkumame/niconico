import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  // ログイン
  async signIn(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // ログアウト
  async signOut() {
    return await this.afAuth.signOut();
  }

  // onAuthStateChangedだと、リアルタイムで検知できる
  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      this.afAuth.onAuthStateChanged(user => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
  
}
