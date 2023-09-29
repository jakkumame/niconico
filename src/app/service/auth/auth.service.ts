import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = getAuth();

  constructor() {}

  // ログイン
  async signIn(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // ログアウト
  async signOut() {
    return await signOut(this.auth);
  }

  // onAuthStateChangedだと、リアルタイムで検知できる
  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, user => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
