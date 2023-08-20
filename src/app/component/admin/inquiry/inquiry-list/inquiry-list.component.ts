import { Component, OnInit } from '@angular/core';
import { RealtimebaseService } from 'src/app/service/realtimebase/realtimebase.service';
import { Inquiry } from 'src/app/interface/inquiry';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.scss']
})
export class InquiryListComponent implements OnInit {
  inquiries: Inquiry[] = [];

  constructor(private realtimebaseService: RealtimebaseService) { }

  ngOnInit() {
    this.realtimebaseService.getInquiries().subscribe(data => {
      this.inquiries = data;
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

}
