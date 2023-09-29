import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApplicationFormService } from 'src/app/service/event/application-form.service';
import { DatePipe } from '@angular/common';
import { Applicant } from 'src/app/interface/applicant';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  providers: [ DatePipe ]
})
export class EventDetailComponent implements OnInit {
  event: any;
  loading: any;
  applicantsData: Applicant[] = [];
  totalApplicants: number = 0;
  adultCount: number = 0;
  childCount: number = 0;
  babyCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private appFormService: ApplicationFormService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private datePipe: DatePipe,
  ) {}

  async ngOnInit(): Promise<void> {
    const date = this.route.snapshot.paramMap.get('date');
    if (date) {
      try {
        await this.presentLoading();

        const applicantsData = await this.appFormService.getApplicantsByDate(date);
        this.totalApplicants = applicantsData.length;
        this.adultCount = applicantsData.filter(applicant => applicant.mealType === 'adult').length;
        this.childCount = applicantsData.filter(applicant => applicant.mealType === 'child').length;
        this.babyCount = applicantsData.filter(applicant => applicant.mealType === 'baby').length;

        this.loading.dismiss();

      } catch(err) {
        this.loading.dismiss();
        this.presentErrorToast('申込情報の取得に失敗しました。');
        console.error('Error fetching MealTypeCount:', err);
      }
    }
  }

  async presentLoading(): Promise<void> {
    this.loading = await this.loadingCtrl.create({
      message: '情報を取得中...',
      translucent: true,
    });
    return await this.loading.present();
  }

  async presentErrorToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: 'danger',
      position: 'middle'
    });
    await toast.present();
  }

  transformDate(timestamp: any): string | null {
    if (timestamp) {
      return this.datePipe.transform(timestamp, 'yyyy年MM月dd日HH:mm');
    }
    return null;
  }


}
