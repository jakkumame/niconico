import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertCtrl: AlertController) { }

  async showErrorAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'エラー',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showCompletedAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: '完了',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
