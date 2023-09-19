import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class EventFormService {

  constructor(private firestore: AngularFirestore) { }

  // 日付の数字を末尾に追加してドキュメントIDを生成するユーティリティ関数
  public generateDocumentId(date: string): string {
    const randomString = uuidv4().split('-')[0]; // uuidの最初の部分を使用
    return `${randomString}${date.replace(/-/g, '')}`; // ランダム文字列とハイフンを取り除いた日付を結合
  }

  // イベントを追加
  addEvent(eventData: any): Promise<any> {
    const eventDate = eventData.date;
    const docId = this.generateDocumentId(eventDate); // ドキュメントIDを生成
    return this.firestore.collection('events').doc(docId).set(eventData);
  }

  // すべてのイベントを取得
  getEventsParams(): Observable<any[]> {
    return this.firestore.collection('events').valueChanges();
  }

  // 特定の日付のイベントを取得
  getEventByDate(date: string): Observable<any> {
    const docId = this.generateDocumentId(date); // ドキュメントIDを生成
    return this.firestore.collection('events').doc(docId).valueChanges();
  }
}
