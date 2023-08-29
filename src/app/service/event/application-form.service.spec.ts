import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { ApplicationFormService } from './application-form.service';
import { Applicant } from 'src/app/interface/applicant';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

describe('ApplicationFormService', () => {
  let service: ApplicationFormService;
  let firestoreMock: any;

  beforeEach(() => {
    // AngularFirestoreのモックを作成
    firestoreMock = {
      collection: jasmine.createSpy('collection').and.callFake((path: string) => {
        return {
          get: jasmine.createSpy('get').and.returnValue(of({
            docs: path.includes('events') ? [{ id: 'sampleEventId' }] : []
          })),
          add: jasmine.createSpy('add').and.returnValue(Promise.resolve())
        };
      })
    };

    TestBed.configureTestingModule({
      // 依存関係としてモックを提供
      providers: [
        { provide: AngularFirestore, useValue: firestoreMock },
        { provide: FIREBASE_OPTIONS, useValue: {} },  // モックFirebaseオプション
        ApplicationFormService
      ]
    });

    service = TestBed.inject(ApplicationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the closest upcoming event ID', (done) => {
    service.getUpcomingEventId().subscribe(id => {
      expect(id).toEqual('sampleEventId');
      done();
    });
  });

  it('should submit an application to the closest upcoming event', (done) => {
    const sampleApplicant: Applicant = {
      name: 'John Doe',
      furigana: 'ジョン ドウ',
      gender: 'male',
      mealType: 'adult',
      age: 25,
      arrivalTime: null,
      remarks: null
    };

    service.submitApplication(sampleApplicant).subscribe(() => {
      expect(firestoreMock.collection).toHaveBeenCalledWith('events/sampleEventId/applicants');
      done();
    });
  });

});
