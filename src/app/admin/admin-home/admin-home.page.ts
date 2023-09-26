import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { LoginComponent } from 'src/app/component/login/login.component';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ContactService } from 'src/app/service/contact/contact.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {

  uncompletedCount: number = 0;

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private contactService: ContactService,
    public router: Router,
    private alertCtrl: AlertController
  ) { }



  async ngOnInit() {
    // ログイン状態のチェック、未ログインならログインフォームへ
    const isLoggedIn = await this.authService.isLoggedIn();
    if (!isLoggedIn) {
      this.presentLoginModal();
    }

    // 問い合わせの未完了（completed=false）数を取得、
    this.contactService.getUncompletedCount().subscribe( count => {
      this.uncompletedCount = count;
    })
  }

  async presentLoginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      backdropDismiss: false  // モーダル以外で閉じることを無効化
    });
    return await modal.present();
  }

  async logOut() {
    const alert = await this.alertCtrl.create({
      header: '確認',
      message: '本当にログアウトしてもよろしいですか？',
      buttons: [
        {
          text: 'いいえ',
          role: 'cancel',
        },
        {
          text: 'はい',
          handler: () => {
            this.authService.signOut();
            this.router.navigateByUrl('/home');
          },
        },
      ]
    });
    await alert.present();
  }


}
