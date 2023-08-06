import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Inquiry } from '../../interface/inquiry';


@Injectable({
  providedIn: 'root'
})
export class RealtimebaseService {

  constructor(private db: AngularFireDatabase) { }

  submitInquiry(inquiry: Inquiry) {
    return new Promise<any>((resolve, reject) =>{
      this.db.list('/inquiries')
        .push(inquiry)
        .then(res => resolve(res), err => reject(err));
    });
  }
}
