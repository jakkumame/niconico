import { RealtimebaseService } from 'src/app/service/realtimebase/realtimebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from 'src/app/component/login/login.component';
import { AuthService } from 'src/app/service/auth/auth.service';

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
    public router: Router,
    private realtimebaseService: RealtimebaseService
  ) { }



  async ngOnInit() {
    // ログイン状態のチェック、未ログインならログインフォームへ
    const isLoggedIn = await this.authService.isLoggedIn();
    if (!isLoggedIn) {
      this.presentLoginModal();
    }

    // 問い合わせの未完了を取得、バッジの表示用
    this.realtimebaseService.getUncompletedCount().subscribe(count => {
      this.uncompletedCount = count;
    });

  }

  async presentLoginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      backdropDismiss: false  // モーダル以外で閉じることを無効化
    });
    return await modal.present();
  }

  logOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/home');
  }


}
