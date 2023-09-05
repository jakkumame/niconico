import { Injectable, inject } from '@angular/core';
import { Auth, User, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);

  constructor() {}

  // ログイン
  async signIn(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  }

  // ログアウト
  async signOut(): Promise<void> {
    await this.auth.signOut();
  }

  // onAuthStateChangedだと、リアルタイムで検知できる
  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      const unsubscribe = this.auth.onAuthStateChanged(user => {
        unsubscribe(); // Unsubscribe after the first invocation
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

}
