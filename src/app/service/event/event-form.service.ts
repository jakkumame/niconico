import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventFormService {

  private db = getFirestore(); // Firestoreのインスタンスを取得

  constructor() { }

  public generateDocumentId(date: string): string {
    const randomString = uuidv4().split('-')[0];
    return `${randomString}${date.replace(/-/g, '')}`;
  }

  async addEvent(eventData: any): Promise<void> {
    const eventDate = eventData.date;
    const docId = this.generateDocumentId(eventDate);
    return setDoc(doc(this.db, 'events', docId), eventData);
  }

  // すべてのイベントを取得
  async getEvents(): Promise<any[]> {
    const q = query(collection(this.db, 'events'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  }

  // 特定の日付のイベントを取得
  async getEventByDate(date: string): Promise<any> {
    const docId = this.generateDocumentId(date);
    const docRef = doc(this.db, 'events', docId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }
}
