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
  updateArticle(articleId: string, data: Article): Promise<void> {
    return this.firestore.collection('articles').doc(articleId).update(data).then(() => {
      console.log('Document successfully updated!');
    }).catch(error => {
      console.error('Error updating document:', error);
    });
  }

  // 記事を削除するメソッド (Promiseを返す)
  deleteArticle(articleId: string): Promise<void> {
    return this.firestore.collection('articles').doc(articleId).delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch(error => {
      console.error('Error deleting document:', error);
    });
  }



}
