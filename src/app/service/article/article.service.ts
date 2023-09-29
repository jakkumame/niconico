import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    ) { }

  // 記事を追加するメソッド (Promiseを返す)
  addArticle(data: any): Promise<void> {
    return this.firestore.collection('articles').add(data).then(docRef => {
      console.log('Document written with ID:', docRef.id);
    }).catch(error => {
      console.error('Error adding document:', error);
    });
  }

  // 全ての記事を取得するメソッド (Observableを返す)
  getArticles(): Observable<any[]> {
    return this.firestore.collection('articles').snapshotChanges();
  }

  // 記事を更新するメソッド (Promiseを返す)
  updateArticle(id: string, data: any): Promise<void> {
    return this.firestore.collection('articles').doc(id).update(data).then(() => {
      console.log('Document successfully updated!');
    }).catch(error => {
      console.error('Error updating document:', error);
    });
  }

  // 記事を削除するメソッド (Promiseを返す)
  deleteArticle(id: string): Promise<void> {
    return this.firestore.collection('articles').doc(id).delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch(error => {
      console.error('Error deleting document:', error);
    });
  }

  uploadImage(image: File) {
    const filePath = `articleImages/${new Date().getTime()}_${image.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, image);

    // アップロード完了後のURLを取得
    return task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL())
    );
  }


}
