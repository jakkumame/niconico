import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private firestore: AngularFirestore,
    ) { }

  // 記事を追加するメソッド
  addArticle(data: any) {
    const ID = this.firestore.createId();
    data.articleId = ID;
    return this.firestore.collection('articles').doc(ID).set(data);
  }

  // 全ての記事を取得するメソッド
  getArticles() {
    return this.firestore.collection('articles').snapshotChanges();
  }

  // 記事を更新するメソッド
  updateArticle(id: string, data: any) {
    return this.firestore.collection('articles').doc(id).update(data);
  }

  // 記事を削除するメソッド
  deleteArticle(id: string) {
    return this.firestore.collection('articles').doc(id).delete();
  }


}
