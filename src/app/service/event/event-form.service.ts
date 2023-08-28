
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventFormService {

  constructor(private firestore: AngularFirestore) { }

// イベントを追加
addEvent(eventData: any): Promise<any> {
  const eventDate = eventData.date;
  return this.firestore.collection('events').doc(eventDate).set(eventData);
}

// すべてのイベントを取得
getEvents(): Observable<any[]> {
  return this.firestore.collection('events').valueChanges();
}

// 特定の日付のイベントを取得
getEventByDate(date: string): Observable<any> {
  return this.firestore.collection('events').doc(date).valueChanges();
}







}
