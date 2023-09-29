import { Injectable } from '@angular/core';
import { collection, doc, query, where, getDocs, getFirestore, setDoc } from '@firebase/firestore';
import { Applicant } from "src/app/interface/applicant";

@Injectable({
  providedIn: 'root'
})
export class ApplicationFormService {
  private db = getFirestore();

  constructor() {}

  // イベントを取得するメソッド
  async getEvents(): Promise<any[]> {
    try {
      const q = query(collection(this.db, 'events'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ ...doc.data() }));
    } catch (error) {
      throw error;
    }
  }

  // 特定のイベントの応募者を取得するメソッド
  async getApplicants(docId: string): Promise<any[]> {
    const q = query(collection(this.db, `events/${docId}/applicants`));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  }

  // 日付によって応募者を取得するメソッド
  async getApplicantsByDate(date: string): Promise<any[]> {
    const q = query(collection(this.db, 'events'), where('date', '==', date));
    const eventSnapshot = await getDocs(q);
    if (eventSnapshot.empty) {
      throw new Error('No event found with the given date');
    }
    const docId = eventSnapshot.docs[0].id;
    const applicantQuery = query(collection(this.db, `events/${docId}/applicants`));
    const applicantSnapshot = await getDocs(applicantQuery);
    return applicantSnapshot.docs.map(doc => doc.data());
  }

  // 応募情報を提出するメソッド
  async submitApplication(docId: string, applicant: Applicant): Promise<void> {
    applicant.timestamp = new Date().toISOString();
    await setDoc(doc(this.db, `events/${docId}/applicants`, applicant.timestamp), applicant);
  }
}
