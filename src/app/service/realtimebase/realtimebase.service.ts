import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Inquiry } from '../../interface/inquiry';
import { AlertController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RealtimebaseService {

  private inquiriesPath = '/inquiries';

  constructor(private db: AngularFireDatabase, private alertController: AlertController) { }

  private async handleError(error: any, message: string) {
    console.error('Error in RealtimebaseService:', error);
    this.presentErrorAlert(`${message} Firebaseでのエラー:${error.message}`);
  }

  private async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'エラー',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async submitInquiry(inquiry: Inquiry) {
    try {
      await this.db.list(this.inquiriesPath).push(inquiry);
    } catch (error) {
      this.handleError(error, '問い合わせの送信に失敗しました。');
    }
  }

  getInquiries(): Observable<Inquiry[]> {
    return this.db.list<Inquiry>(this.inquiriesPath).valueChanges().pipe(
      catchError(error => {
        this.handleError(error, '問い合わせ一覧の取得に失敗しました。');
        return of([]);  // 取得できない場合、空の配列を返す
      })
    );
  }

  getInquiryById(id: string) {
    try {
      return this.db.object<Inquiry>(`${this.inquiriesPath}/${id}`).valueChanges();
    } catch (error) {
      this.handleError(error, `ID:${id}の問い合わせの取得に失敗しました。`);
      return null;
    }
  }
}
