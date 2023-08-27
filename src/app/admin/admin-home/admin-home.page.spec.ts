import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminHomePage } from './admin-home.page';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RealtimebaseService } from 'src/app/service/realtimebase/realtimebase.service';
import { of } from 'rxjs';

// MockModalControllerの定義
class MockModalController {
  create(config: any) {
    return {
      present: () => Promise.resolve(),
      dismiss: () => Promise.resolve()
    };
  }
}

// MockAuthServiceの定義
class MockAuthService {
  isLoggedIn() {
    return Promise.resolve(true); // もしくは、false
  }

  signOut() {
    return Promise.resolve();
  }
}

// MockRealtimebaseServiceの定義
class MockRealtimebaseService {
  getUncompletedCount() {
    return of(0); // もしくは、任意の数字
  }
}

describe('AdminHomePage', () => {
  let component: AdminHomePage;
  let fixture: ComponentFixture<AdminHomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminHomePage],
      providers: [
        { provide: ModalController, useClass: MockModalController },
        { provide: AuthService, useClass: MockAuthService },
        { provide: RealtimebaseService, useClass: MockRealtimebaseService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 必要に応じて他のテストケースを追加してください。
});
