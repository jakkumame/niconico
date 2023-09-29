import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  DocumentReference
} from '@angular/fire/firestore';
import { getFirestore } from '@angular/fire/firestore';
import { getDoc } from '@angular/fire/firestore';
import { Contact } from 'src/app/interface/contact';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private db = getFirestore();

  constructor() {}

  // 連絡先を保存するメソッド
  saveContact(Data: Contact) {
    // ドキュメントIDを生成
    const docId = doc(this.db, 'contacts').id;
    Data.contactId = docId;
    // 現在の日時をタイムスタンプとして設定
    Data.timestamp = new Date();
    // 生成したIDを持つドキュメントにデータをセット
    return setDoc(doc(this.db, 'contacts', docId), Data);
  }

  // すべての連絡先を取得するメソッド
  async getAllContacts(): Promise<Contact[]> {
    // タイムスタンプの降順で連絡先を取得
    const q = query(collection(this.db, 'contacts'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as Contact);
  }

  // IDによって連絡先を取得するメソッド
  async getContactById(contactId: string): Promise<Contact | undefined> {
    // 指定されたIDのドキュメントのデータを取得
    const docSnap = await getDoc(doc(this.db, 'contacts', contactId));
    if (docSnap.exists()) {
      return docSnap.data() as Contact;
    } else {
      return undefined;
    }
  }

  // 連絡先を更新するメソッド
  async updateContact(contactId: string, contact: Contact) {
    // 指定されたIDのドキュメントを更新
    const contactRef: DocumentReference<Contact> = doc(this.db, 'contacts', contactId) as DocumentReference<Contact>;
    await updateDoc(contactRef, contact);
  }

  // 未完了の連絡先の数を取得するメソッド
  async getUncompletedCount(): Promise<number> {
    // completedフィールドがfalseのドキュメントの数を取得
    const q = query(collection(this.db, 'contacts'), where('completed', '==', false));
    const snapshot = await getDocs(q);
    return snapshot.size;
  }
}
