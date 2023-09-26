import { ContactService } from './../service/contact/contact.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contact } from '../interface/contact';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CookieService } from '../service/cookie/cookie.service';

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
    private contactService: ContactService,
    private alertController: AlertController,
    public router: Router,
    private cookie: CookieService,
  ) {}

async onSubmit() {
    const formData: Contact = this.contactForm.value as Contact;
    this.contactService.saveContact(formData)
      .then(() => {
        this.presentAlert('成功', 'お問い合わせが正常に送信されました。');
      })
      .catch(error => {
        this.presentAlert('エラー', 'お問い合わせの送信中にエラーが発生しました。');
        console.error("お問い合わせ内容の保存に失敗: ", `内容(${error})`);
      });
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
