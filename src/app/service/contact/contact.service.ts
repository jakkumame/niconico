import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contact } from 'src/app/interface/contact';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private firestore: AngularFirestore,

  ) { }

  saveContact(Data: Contact) {
    const docId = this.firestore.createId();
    Data.contactId = docId
    Data.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    return this.firestore.collection('contacts').doc(docId).set(Data)
  }

  getAllContacts(): Observable<Contact[]> {
    return this.firestore.collection<Contact>('contacts', ref => ref.orderBy('timestamp', 'desc')).valueChanges();
  }

  getContactById(contactId: string) {
    return this.firestore.collection('contacts').doc<Contact>(contactId).valueChanges();
  }

  async updateContact(contactId: string, contact: Contact) {
    await this.firestore.collection('contacts').doc(contactId).update(contact);
  }

}
