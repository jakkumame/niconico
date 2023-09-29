import { Injectable } from '@angular/core';
import { collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { getFirestore } from '@angular/fire/firestore';
import { getStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private db = getFirestore();
  private storage = getStorage();

  constructor() { }

  // 記事を追加するメソッド
  async addArticle(data: any) {
    const ID = doc(this.db, 'articles').id;
    data.articleId = ID;
    await setDoc(doc(this.db, 'articles', ID), data);
  }

  // 全ての記事を取得するメソッド
  async getArticles() {
    const querySnapshot = await getDocs(collection(this.db, 'articles'));
    return querySnapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
  }

  // 記事を更新するメソッド
  async updateArticle(id: string, data: any) {
    await updateDoc(doc(this.db, 'articles', id), data);
  }

  // 記事を削除するメソッド
  async deleteArticle(id: string) {
    await deleteDoc(doc(this.db, 'articles', id));
  }
}
