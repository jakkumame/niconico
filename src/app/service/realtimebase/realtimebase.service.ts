import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Inquiry } from '../../interface/inquiry';


@Injectable({
  providedIn: 'root'
})
export class RealtimebaseService {

  constructor(private db: AngularFireDatabase) { }

  submitInquiry(inquiry: Inquiry) {
    return this.db.list('/inquiries').push(inquiry)
      .catch((error) => {
        console.error('Error in RealtimebaseService:', error);
        throw new Error(`Failed to submit inquiry due to Firebase error: ${error.message}`);
      });
  }
}
