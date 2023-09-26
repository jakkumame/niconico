// import { AuthService } from 'src/app/service/auth/auth.service';
// import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/compat/database';
// import { Contact } from '../../interface/contact';
// import { AlertController } from '@ionic/angular';
// import { Observable, from, of } from 'rxjs';
// import { catchError, map, switchMap } from 'rxjs/operators';
// @Injectable({
//   providedIn: 'root'
// })
// export class RealtimebaseService {
//   private inquiriesPath = '/inquiries';

//   constructor(
//     private db: AngularFireDatabase,
//     private alertController: AlertController,
//     private authService: AuthService
//     ) { }

//     private async handleError(error: any, prefix: string, showAlert: boolean = true) {
//       console.error(`${prefix} Error in RealtimebaseService:`, error);
//       if (showAlert) {
//         this.presentErrorAlert(`${prefix} Firebaseでのエラー: ${error.message}`);
//       }
//     }


//   private async presentErrorAlert(message: string) {
//     const alert = await this.alertController.create({
//       header: 'エラー',
//       message: message,
//       buttons: ['OK']
//     });
//     await alert.present();
//   }

//   async submitInquiry(inquiry: Contact) {
//     const ref = this.db.list(this.inquiriesPath).push(inquiry);
//     if (ref && ref.key) {
//       inquiry.key = ref.key;
//       await ref.update({ key: ref.key });
//     } else {
//       this.handleError(new Error('Key generation failed'), '問い合わせの送信に失敗しました。');
//     }
//   }

//   getInquiries(): Observable<Inquiry[]> {
//     return from(this.authService.isLoggedIn()).pipe(
//       switchMap(isLoggedIn => {
//         if (isLoggedIn) {
//           return this.db.list<Inquiry>(this.inquiriesPath).valueChanges().pipe(
//             catchError(error => {
//               this.handleError(error, '問い合わせ一覧の取得に失敗しました。', false);
//               return of([]);
//             })
//           );
//         } else {
//           // ログインしていない場合、アラートを表示せずに空の配列を返す
//           return of([]);
//         }
//       })
//     );
//   }


//   getUncompletedCount(): Observable<number> {
//     return this.getInquiries().pipe(
//       map(inquiries => inquiries.filter(inquiry => !inquiry.completed).length),
//       catchError(error => {
//         this.handleError(error, '未完了の問い合わせの数の取得に失敗しました。');
//         return of(0);
//       })
//     );
//   }

//   async updateInquiry(key: string, inquiry: Inquiry) {
//     try {
//       await this.db.object(`${this.inquiriesPath}/${key}`).update(inquiry);
//     } catch (error) {
//       this.handleError(error, `ID:${key}の問い合わせの更新に失敗しました。`);
//     }
//   }
// }
