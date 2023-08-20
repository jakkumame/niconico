import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Inquiry } from '../../interface/inquiry';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RealtimebaseService {

  constructor(private db: AngularFireDatabase, private alertController: AlertController) { }

  async submitInquiry(inquiry: Inquiry) {
    try {
      await this.db.list('/inquiries').push(inquiry);
    } catch (error) {
      console.error('Error in RealtimebaseService:', error);
      this.presentErrorAlert(`問い合わせの送信に失敗しました。Firebaseでのエラー:${(error as any).message}`);
    }
  }

  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'エラー',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  // 問い合わせ一覧の取得
  getInquiries() {
    return this.db.list<Inquiry>('/inquiries').valueChanges();
  }

  // 特定のIDを持つ問い合わせの詳細を取得
  getInquiryById(id: string) {
    return this.db.object<Inquiry>(`/inquiries/${id}`).valueChanges();
  }
}
