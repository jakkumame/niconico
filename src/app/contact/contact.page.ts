import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RealtimebaseService } from '../service/realtimebase/realtimebase.service';
import { Inquiry } from '../interface/inquiry';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})

export class ContactPage {
  contactForm = this.fb.group({
    name: ['', Validators.required ],
    age: ['', Validators.required ],
    inquiryType: ['', Validators.required ],
    tel: ['', Validators.required ],
    email: ['', [Validators.required, Validators.email] ],
    address: ['', Validators.required ],
    notice: ['', ],
    privacyPolicy: [false, Validators.requiredTrue]
  });

  constructor(
    private fb: FormBuilder,
    private rb: RealtimebaseService,
    private alertController: AlertController,
    public router: Router,
  ) {}

  async onSubmit() {
    console.log(this.contactForm.value);
    if (this.contactForm.valid) {
      try {
        await this.rb.submitInquiry(this.contactForm.value as Inquiry);
        this.presentAlert('成功', '問い合わせが正常に送信されました。');
        this.router.navigateByUrl('/home');
      } catch (error) {
        console.error('ContactPageでのエラー:', error);
        this.presentAlert('エラー', `問い合わせの送信に失敗しました: ${(error as any).message}`);
      }
    } else {
      this.presentAlert('検証エラー', 'すべての必須フィールドを正しく入力してください。');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
