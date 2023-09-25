import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppFormAlertService {

  constructor(private alertCtrl: AlertController) {}

  async showErrorMessageAlert(messages: string[]): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: '入力エラー',
      message: messages.join(''),
      buttons: ['閉じる']
    });
    await alert.present();
  }

  async showErrorSubmissionAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: '送信エラー',
      message: '申し込みの送信中にエラーが発生しました。もう一度お試しください。',
      buttons: ['閉じる']
    });
    await alert.present();
  }

  async confirmAttendanceAlert(totalApplicants: number, mealCounts: { child: number, adult: number, baby: number }): Promise<boolean> {
    return new Promise(async (resolve) => {
      const message = `
        申込者の合計: ${totalApplicants}人
        子ども食: ${mealCounts.child}食
        大人食: ${mealCounts.adult}食
        離乳食: ${mealCounts.baby}食
      `;

      const alert = await this.alertCtrl.create({
        header: '申込みの概要',
        message: message,
        buttons: [
          {
            text: 'キャンセル',
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: '申し込む',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      await alert.present();
    });
  }


}
