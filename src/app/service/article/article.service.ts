import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map, throwError } from 'rxjs';
import { switchMap, last, catchError } from 'rxjs/operators';
import { Article } from 'src/app/interface/article';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    ) { }

  // 記事を追加するメソッド (Promiseを返す)
  async addArticle(data: any): Promise<void> {
    try {
      const docRef = await this.firestore.collection('articles').add(data);
      // 生成されたIDをarticleIdプロパティに追加
      await this.firestore.collection('articles').doc(docRef.id).update({
        articleId: docRef.id
      });
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }


  // articleIdからそのオブジェクトを取得するメソッド（Observableを返す）
  getArticleById(articleId: string):Observable<any>{
    return this.firestore.collection('articles').doc(articleId).valueChanges();
  };

  // 全ての記事を取得するメソッド (Observableを返す)
  getArticles(): Observable<Article[]> {
    return this.firestore.collection('articles').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Article;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
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



  uploadImage(image: File): Observable<string> {
    // 現在の日付をyyyy-MM-dd形式で取得します。
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // 'yyyy-MM-dd'形式に変換

    const filePath = `articleImages/${formattedDate}_${image.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, image);

    // アップロードタスクの変更を監視し、最後のスナップショットを取得した後でダウンロードURLを取得
    return task.snapshotChanges().pipe(
      last(), // 最後のスナップショットを取得
      switchMap(() => fileRef.getDownloadURL()), // ダウンロードURLを取得するObservableに切り替える
      catchError(error => {
        console.error('Upload failed:', error);
        return throwError('画像のアップロードに失敗しました。もう一度お試しください。');
      })
    );
  }



}
