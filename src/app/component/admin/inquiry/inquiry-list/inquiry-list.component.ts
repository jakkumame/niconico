import { ContactService } from './../../../../service/contact/contact.service';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/interface/contact';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.scss'],
  providers: [DatePipe]
})
export class InquiryListComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(
    private contactService: ContactService,
    private datePipe: DatePipe,
    private alertController: AlertController
  ) { }

async ngOnInit() {
  this.contacts = await this.contactService.getAllContacts();
}

  getInquiryTypeLabel(inquiryType: string): string {
    switch (inquiryType) {
      case 'inquiry': return 'お問い合わせについて';
      case 'donation': return '寄付について';
      case 'volunteer': return 'ボランティア応募について';
      default: return '不明なお問い合わせ（エラー）';
    }
  }

  // timestampをtoDate()でDateに整形
  formatTimestamp(timestamp: any): string | null {
    const date = timestamp ? timestamp.toDate() : null;
    return date ? this.datePipe.transform(date, 'M月d日 HH:mm') || '日付なし' : '日付なし';
  }



  async toggleCompletion(event: any, contact: Contact) {
    // チェックボックスのデフォルトの動作(event)をキャンセル
    event.preventDefault();
    event.stopPropagation();

    const updateContactStatus = (status: boolean) => {
        if (contact.contactId) {
            contact.completed = status;
            this.contactService.updateContact(contact.contactId, contact);
        }
    };

    const alert = await this.alertController.create({
        header: '確認',
        message: 'こちらのお問い合わせは、対応完了しましたか',
        buttons: [
            {
                text: '未完了',
                role: 'cancel',
                handler: () => updateContactStatus(false)
            },
            {
                text: '完了',
                role: 'ok',
                handler: () => updateContactStatus(true)
            }
        ]
    });

    await alert.present();
  }


}
