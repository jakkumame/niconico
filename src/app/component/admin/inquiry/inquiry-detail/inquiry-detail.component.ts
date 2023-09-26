import { ContactService } from './../../../../service/contact/contact.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/interface/contact';
import { DatePipe } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inquiry-detail',
  templateUrl: './inquiry-detail.component.html',
  styleUrls: ['./inquiry-detail.component.scss']
})
export class InquiryDetailComponent implements OnInit {

  contact!: Contact;
  contactID!: string;


  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    this.contactID = this.route.snapshot.paramMap.get('contactId')!;
    this.getContactDetail();
  }

  getContactDetail() {
    this.contactService.getContactById(this.contactID).subscribe(contactData => {
      this.contact = contactData!;
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

  // timestampをtoDate()でDateに整形
  formatTimestamp(timestamp: any): string | null {
    const date = timestamp ? timestamp.toDate() : null;
    return date ? this.datePipe.transform(date, 'M月d日 HH:mm') || '日付なし' : '日付なし';
  }

}
