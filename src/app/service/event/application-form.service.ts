import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Applicant } from "src/app/interface/applicant";

@Injectable({
  providedIn: 'root'
})
export class ApplicationFormService {

  constructor(private afs: AngularFirestore) {}

  getEvents() {
    return this.afs.collection('events').valueChanges({ idField: 'eventId' });
  }

  submitApplication(eventId: string, applicant: Applicant): Promise<void> {
    const id = this.afs.createId();
    applicant.timestamp = new Date().toISOString();
    return this.afs.collection('events').doc(eventId).collection('applicants').doc(id).set(applicant);
  }
}
