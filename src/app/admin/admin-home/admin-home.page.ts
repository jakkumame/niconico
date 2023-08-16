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

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    public router: Router
  ) { }

  async ngOnInit() {
    const isLoggedIn = await this.authService.isLoggedIn();
    if (!isLoggedIn) {
      this.presentLoginModal();
    }
  }

  async presentLoginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      backdropDismiss: false  // モーダル以外のタップで閉じることを無効化
    });
    return await modal.present();
  }

  logOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/home');
  }


}
