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
    private datePipe: DatePipe
    ) { }

  ngOnInit() {
    this.realtimebaseService.getInquiries().subscribe((data: Inquiry[]) => {
      if (data) {
        this.inquiries = data;
      } else {
        // 通常nullということはないという前提
        console.warn('Inquiries data is null.');
      }
    });
  }


  getInquiryTypeLabel(inquiryType: string): string {
    switch (inquiryType) {
      case 'inquiry':
        return 'お問い合わせについて';
      case 'donation':
        return '寄付について';
      case 'volunteer':
        return 'ボランティア応募について';
      default:
        return 'デフォルトのラベル';
    }
  }

  // 日付をフォーマットするメソッド
  formatInquiryDate(date: string | undefined): string | null {
    if (!date) {
      return '日付なし';
    }
    return this.datePipe.transform(date, 'M月d日 HH:mm') || '日付なし';
  }

}
