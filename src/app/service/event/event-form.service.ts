import { Injectable } from '@angular/core';
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc, collection, query, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class EventFormService {
  private db = getFirestore();

  constructor() { }

  // 日付の数字を末尾に追加してドキュメントIDを生成するユーティリティ関数
  public generateDocumentId(date: string): string {
    const randomString = uuidv4().split('-')[0]; // uuidの最初の部分を使用
    return `${date.replace(/-/g, '')}${randomString}`; // ランダム文字列とハイフンを取り除いた日付を結合
  }

  // イベントを追加
  async addEvent(eventData: any): Promise<any> {
    const eventDate = eventData.date;
    const docId = this.generateDocumentId(eventDate);
    eventData.eventId = docId; // 生成されたドキュメントIDをイベントデータに追加
    await setDoc(doc(this.db, 'events', docId), eventData);
    return eventData;
  }

  // すべてのイベントを取得
  async getEventsParams(): Promise<any[]> {
    const q = query(collection(this.db, 'events'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  }

  // 特定の日付のイベントを取得
  async getEventByDate(date: string): Promise<any> {
    const docId = this.generateDocumentId(date); // ドキュメントIDを生成
    const docSnap = await getDoc(doc(this.db, 'events', docId));
    return docSnap.data();
  }

  // ドキュメントを削除するメソッド
  async deleteEvent(docId: string): Promise<void> {
    await deleteDoc(doc(this.db, 'events', docId));
  }

  // イベント情報の更新
  async updateEvent(docId: string, eventData: any): Promise<void> {
    await updateDoc(doc(this.db, 'events', docId), eventData);
  }
}
