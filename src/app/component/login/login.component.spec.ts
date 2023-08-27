import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { ModalController, AlertController } from '@ionic/angular';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // モックサービス
  const mockAuthService = {
    signIn: jasmine.createSpy('signIn').and.resolveTo(),
    signOut: jasmine.createSpy('signOut').and.resolveTo()
  };

  const mockModalController = {
    dismiss: jasmine.createSpy('dismiss').and.resolveTo()
  };

  const mockAlertController = {
    create: jasmine.createSpy('create').and.resolveTo({ present: () => {} })
  };

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl').and.resolveTo()
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        FormBuilder, // FormBuilderはモックの必要がありません
        { provide: AuthService, useValue: mockAuthService },
        { provide: ModalController, useValue: mockModalController },
        { provide: AlertController, useValue: mockAlertController },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // この部分に、さらに具体的なテストケースを追加してください。例えば:
  // - フォームが無効の場合、`onSubmit`がAuthServiceの`signIn`を呼び出さないこと
  // - `onSubmit`がAuthServiceの`signIn`を正しい引数で呼び出すこと
  // - `signIn`がエラーをスローすると、アラートが表示されること など
});
