import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, take } from 'rxjs';
import { Applicant } from 'src/app/interface/applicant';
import { ApplicationFormService } from 'src/app/service/event/application-form.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  providers: [ DatePipe ]
})
export class EventDetailComponent implements OnInit {
  event: any;
  applicants$!: Observable<Applicant[]>;
  loading: any;
  totalApplicants: number = 0;
  adultCount: number = 0;
  childCount: number = 0;
  babyCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private appFormService: ApplicationFormService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit(): void {
    const date = this.route.snapshot.paramMap.get('date');
    if (date) {
      this.presentLoading().then(() => {
        this.applicants$ = this.appFormService.getApplicantsByDate(date);

        this.applicants$.pipe(take(1)).subscribe({
          next: (data) => {
            this.totalApplicants = data.length;
            this.adultCount = data.filter(applicant => applicant.mealType === 'adult').length;
            this.childCount = data.filter(applicant => applicant.mealType === 'child').length;
            this.babyCount = data.filter(applicant => applicant.mealType === 'baby').length;
            this.loading.dismiss();
          },
          error: (err) => {
            this.loading.dismiss();
            this.presentErrorToast('申込情報の取得に失敗しました。');
            console.error('Error fetching applicants:', err);
          }
        });
      }).catch((err) => {
        this.presentErrorToast('読み込みの表示中にエラーが発生しました。');
        console.error('Error presenting loading:', err);
      });
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


}
