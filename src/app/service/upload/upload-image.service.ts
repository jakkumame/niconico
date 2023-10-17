import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { catchError, last } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';
import { AlertService } from '../alert/alert.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  constructor(
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  // 画像をアップロードするメインのトリガー関数
  async uploadImage(image: File): Promise<string> {
    if (!this.validateFile(image)) {
      this.alertService.showErrorAlert('ファイルの形式が不正、またはサイズが大きすぎます。');
      return '';
    }

    await this.loadingService.present('アップロード中...');

    return this.uploadToStorage(image)
      .catch(error => {
        console.error('Upload failed:', error);
        this.alertService.showErrorAlert('画像のアップロードに失敗しました。もう一度お試しください。');
        return '';
      })
      .finally(async () => {
        await this.loadingService.dismiss();
      });
  }

  // アップロード準備（パス、ファイルパスをセット）関数
  private async uploadToStorage(image: File): Promise<string> {
    const filePath = await this.generateFilePath(image);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, image);

    await task.snapshotChanges().pipe(
      last(),
      catchError(error => {
        this.alertService.showErrorAlert(`${error}`);
        return Promise.reject('');
      })
    ).toPromise();

    const url = await fileRef.getDownloadURL().toPromise();
    this.alertService.showCompletedAlert('アップロードが完了しました！');
    return url;
  }

  // ファイルのバリデーションを行う関数
  private validateFile(image: File): boolean {
    const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxFileSize = 10 * 1024 * 1024; //  5MB

    if (!validFileTypes.includes(image.type) || image.size > maxFileSize) {
      return false;
    }

    return true;
  }

  // ファイルパスを生成する関数
  private async generateFilePath(image: File): Promise<string> {
    const user = await this.afAuth.currentUser; // awaitを使用して現在のユーザーを取得
    const userId = user ? user.uid : "anonymous"; // ユーザーがログインしていない場合は "anonymous" を使用
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // 'yyyy-MM-dd'形式
    return `articleImages/${userId}/${formattedDate}_${image.name}`; // ユーザーIDをパスに含める
  }


}
