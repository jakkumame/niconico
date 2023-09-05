import { Injectable, Inject } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { Applicant } from "src/app/interface/applicant";
import { Firestore, collection, doc, getDocs, query, where, setDoc, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApplicationFormService {
  constructor(@Inject(Firestore) private firestore: Firestore) {}

  getEvents(): Observable<any> {
    const eventsCollection = collection(this.firestore, 'events');
    return collectionData(eventsCollection) as Observable<any[]>;
  }

  getApplicants(eventId: string): Observable<any> {
    const applicantsCollection = collection(this.firestore, `events/${eventId}/applicants`);
    return collectionData(applicantsCollection) as Observable<any[]>;
  }

  getApplicantsByDate(date: string): Observable<any> {
    const eventsCollection = query(collection(this.firestore, 'events'), where('date', '==', date));
    return from(getDocs(eventsCollection)).pipe(
      mergeMap(eventSnapshots => {
        if (eventSnapshots.empty) {
          return throwError(() => new Error('No event found with the given date'));
        }
        const eventId = eventSnapshots.docs[0].id;
        return this.getApplicants(eventId);
      })
    );
  }

  async submitApplication(eventId: string, applicant: Applicant): Promise<void> {
    applicant.timestamp = new Date().toISOString();
    return setDoc(doc(this.firestore, 'events', eventId, 'applicants'), applicant);
  }
}
