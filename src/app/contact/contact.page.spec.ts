import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ContactPage } from './contact.page';
import { RealtimebaseService } from 'src/app/service/realtimebase/realtimebase.service';  // 適切なパスを設定してください

// RealtimebaseServiceをモック化
class MockRealtimebaseService {
  // ここで必要なメソッドやプロパティをモック化します
}

describe('ContactPage', () => {
  let component: ContactPage;
  let fixture: ComponentFixture<ContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactPage],
      providers: [
        { provide: RealtimebaseService, useClass: MockRealtimebaseService }
        // 必要に応じて他のサービスやモジュールの提供・モック化
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
