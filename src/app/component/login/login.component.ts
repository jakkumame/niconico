import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private modalController: ModalController,
    private alertController: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.signIn(email, password);
        this.modalController.dismiss();
      } catch (error) {
        console.error('Login error:', error);
        this.presentAlertError((error as any).message);  // ここでエラーメッセージを表示
      }
    }
  }

  // エラーメッセージ表示のためのメソッド
  async presentAlertError(message: string) {
    const alert = await this.alertController.create({
      header: 'ログインエラー',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


}
