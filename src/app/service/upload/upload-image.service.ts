import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, of } from 'rxjs';
import { catchError, last } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { LoadingService } from '../loading/loading.service'; // 適切なパスを確認してください
import { AlertService } from '../alert/alert.service'; // 適切なパスを確認してください

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  constructor(
    private storage: AngularFireStorage,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  // 画像をアップロードするメインの関数
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

  private async uploadToStorage(image: File): Promise<string> {
    const filePath = this.generateFilePath(image);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, image);

    await task.snapshotChanges().pipe(
      last(),
      catchError(error => {
        this.handleUploadError(error);
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
    const maxFileSize = 5 * 1024 * 1024; // 例: 5MB

    if (!validFileTypes.includes(image.type) || image.size > maxFileSize) {
      return false;
    }

    return true;
  }

  // ファイルパスを生成する関数
  private generateFilePath(image: File): string {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // 'yyyy-MM-dd'形式
    return `articleImages/${formattedDate}_${image.name}`;
  }

  // アップロードエラーを処理する関数
  private handleUploadError(error: any): Observable<string> {
    console.error('Upload failed:', error);
    this.alertService.showErrorAlert('画像のアップロードに失敗しました。もう一度お試しください。');
    return of('');
  }
}
