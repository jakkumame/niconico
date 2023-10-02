import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize, map } from 'rxjs';
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
    const filePath = `articleImages/${uuidv4()}_${image.name}`;
    // Firebase Storageの参照を作成
    const fileRef = this.storage.ref(filePath);
    // 画像をFirebase Storageにアップロードするタスクを開始
    const task = this.storage.upload(filePath, image);
    // 新しいObservableを返す
    return new Observable(observer => {
      // アップロードタスクの変更を監視
      task.snapshotChanges().pipe(
        // アップロードタスクが完了したときに実行
        finalize(() => {
          // アップロードが完了したら、画像のダウンロードURLを取得
          fileRef.getDownloadURL().subscribe(url => {
            // 取得したダウンロードURLをObservableに発行
            observer.next(url);
            // Observableの完了を通知
            observer.complete();
          });
        })
      ).subscribe();
    });
  }


}
