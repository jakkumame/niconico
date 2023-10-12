import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorAlertService {

  constructor(private alertCtrl: AlertController) { }

  async showErrorAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'エラー',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
