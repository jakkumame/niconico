import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RealtimebaseService } from './realtimebase.service';
import { environment } from '../../../environments/environment';

const yourFirebaseConfig = environment.firebase;

describe('RealtimebaseService', () => {
  let service: RealtimebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(yourFirebaseConfig),
        AngularFireDatabaseModule
      ],
      providers: [RealtimebaseService]
    });
    service = TestBed.inject(RealtimebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
