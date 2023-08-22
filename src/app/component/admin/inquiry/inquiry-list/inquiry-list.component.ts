import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RealtimebaseService } from 'src/app/service/realtimebase/realtimebase.service';
import { Inquiry } from 'src/app/interface/inquiry';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.scss'],
  providers: [DatePipe]
})
export class InquiryListComponent implements OnInit {
  inquiries: Inquiry[] = [];

  constructor(
    private realtimebaseService: RealtimebaseService,
    private datePipe: DatePipe,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.realtimebaseService.getInquiries().subscribe((data: Inquiry[]) => {
      if (data) {
        this.inquiries = data;
      } else {
        console.warn('Inquiries data is null.');
      }
    });
  }

  getInquiryTypeLabel(inquiryType: string): string {
    switch (inquiryType) {
      case 'inquiry': return 'お問い合わせについて';
      case 'donation': return '寄付について';
      case 'volunteer': return 'ボランティア応募について';
      default: return 'デフォルトのラベル';
    }
  }


  formatInquiryDate(date: string | undefined): string | null {
    return date ? this.datePipe.transform(date, 'M月d日 HH:mm') || '日付なし' : '日付なし';
  }


  async toggleCompletion(event: any, inquiry: Inquiry) {
    // チェックボックスのデフォルトの動作をキャンセル
    event.preventDefault();
    event.stopPropagation();

    const updateInquiryStatus = (status: boolean) => {
        if (inquiry.key) {
            inquiry.completed = status;
            this.realtimebaseService.updateInquiry(inquiry.key, inquiry);
        }
    };

    const alert = await this.alertController.create({
        header: '確認',
        message: 'こちらのお問い合わせは、対応完了しましたか',
        buttons: [
            {
                text: '未完了',
                role: 'cancel',
                handler: () => updateInquiryStatus(!inquiry.completed)
            },
            {
                text: '完了',
                role: 'ok',
                handler: () => updateInquiryStatus(true)
            }
        ]
    });

    await alert.present();
  }


}
