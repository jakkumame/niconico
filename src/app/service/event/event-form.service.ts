
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventFormService {

  constructor(private firestore: AngularFirestore) { }

  // イベントの追加
  addEvent(eventData: any): Promise<any> {
    const eventDate = eventData.date;
    return this.firestore.collection('events').doc(eventDate).set(eventData);
  }


}
