import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RealtimebaseService } from 'src/app/service/realtimebase/realtimebase.service';
import { Inquiry } from 'src/app/interface/inquiry';
import { DatePipe } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inquiry-detail',
  templateUrl: './inquiry-detail.component.html',
  styleUrls: ['./inquiry-detail.component.scss']
})
export class InquiryDetailComponent implements OnInit {

  inquiry: Inquiry | null = null;
  inquiryKey: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private realtimebaseService: RealtimebaseService,
    private datePipe: DatePipe,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    this.inquiryKey = this.route.snapshot.paramMap.get('key');
    this.getInquiryDetail();
  }

  getInquiryDetail() {
    this.realtimebaseService.getInquiries().subscribe(inquiries => {
      const foundInquiry = inquiries.find(inquiry => inquiry.key === this.inquiryKey);
      this.inquiry = foundInquiry ? foundInquiry : null;
    });
  }

  goBack() {
    this.navCtrl.back();
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

}
