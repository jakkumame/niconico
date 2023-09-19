import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, mergeMap, throwError } from 'rxjs';
import { Applicant } from "src/app/interface/applicant";

@Injectable({
  providedIn: 'root'
})
export class ApplicationFormService {

  constructor(
    private afs: AngularFirestore,
    ) {}

  getEvents(): Observable<any[]> {
    return this.afs.collection('events').valueChanges({ idField: 'eventId' })
      .pipe(
        catchError(error => this.handleNotFunctionError(error, 'getEvents'))
      );
  }

  private handleNotFunctionError(error: any, operation: string): Observable<any[]> {
    if (error.message && error.message.includes('not a function')) {
      console.error(`Error in ${operation}: ${error.message}`);
      // ここでユーザーに通知したり、何らかのデフォルトの振る舞いを実装できます。
      return throwError(() => new Error(`Function error in ${operation}: ${error.message}`));
    } else {
      // その他のエラータイプに対するハンドリングもここで行うことができます。
      return throwError(() => error);
    }
  }


  getApplicants(eventId: string) {
    return this.afs.collection('events').doc(eventId).collection('applicants').valueChanges();
  }

  getApplicantsByDate(date: string): Observable<any> {
    return this.afs.collection('events', ref => ref.where('date', '==', date))
      .get()
      .pipe(
        mergeMap(eventSnapshots => {
          const eventDocs = eventSnapshots.docs;
          if (eventDocs.length === 0) {
            return throwError(() => new Error('No event found with the given date'));
          }
          const eventId = eventDocs[0].id;
          return this.afs.collection(`events/${eventId}/applicants`).valueChanges();
        })
      );
  }




  submitApplication(eventId: string, applicant: Applicant): Promise<void> {
    const id = this.afs.createId();
    applicant.timestamp = new Date().toISOString();
    return this.afs.collection('events').doc(eventId).collection('applicants').doc(id).set(applicant);
  }
}
