import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApplicationFormService } from 'src/app/service/event/application-form.service';
import { AlertController, NavController } from '@ionic/angular';
import { Applicant } from "src/app/interface/applicant";
import { hiraganaValidator } from 'src/app/validators/application.validator';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {

  applicationForm: FormGroup;
  availableTimes: string[] = [];
  availableEvents: any[] = [];

  constructor(
    private fb: FormBuilder,
    private appFormService: ApplicationFormService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {
    this.availableTimes = [
      '16:00', '16:15', '16:30', '16:45',
      '17:00', '17:15', '17:30'
    ];
    this.applicationForm = this.fb.group({
      selectedEvent: ['', Validators.required],
      applicants: this.fb.array([this.createApplicantForm()])
    });
  }

  ngOnInit() {
    this.appFormService.getEvents().subscribe(events => {
      this.availableEvents = events;
    });
  }

  get applicants(): FormArray {
    return this.applicationForm.get('applicants') as FormArray;
  }

  createApplicantForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      furigana: ['', [Validators.required, hiraganaValidator()]],
      age: [null, Validators.required],
      gender: ['female', Validators.required],
      mealType: ['child', Validators.required],
      arrivalTime: [this.availableTimes[0]],
      remarks: ['']
    });
  }

  addApplicant(): void {
    this.applicants.push(this.createApplicantForm());
  }

  removeApplicant(index: number): void {
    this.applicants.removeAt(index);
  }

  async submitForm(): Promise<void> {
    if (this.applicationForm.valid) {
      const selectedEvent = this.applicationForm.value.selectedEvent;
      for (const applicant of this.applicationForm.value.applicants) {
        await this.appFormService.submitApplication(selectedEvent, applicant as Applicant);
      }
    } else {
      // フォームが無効の場合、どのフィールドが無効であるかをチェックしてエラーメッセージを作成します。
      const errorMessages: string[] = [];
      const controls = this.applicationForm.controls;

      if (controls['selectedEvent'].errors) {
        if (controls['selectedEvent'].errors['required']) {
          errorMessages.push('イベントは必須です。');
        }
        // 他のselectedEventのエラーチェックもここに追加できます。
      }

      const applicantControls = this.applicants.controls;
      applicantControls.forEach((control, index) => {
        if (!control.valid) {
          const applicantErrors = [];
          if (control.get('name')?.errors?.['required']) {
            applicantErrors.push('名前は必須です。');
          }
          if (control.get('furigana')?.errors?.['hiraganaOnly']) {
            applicantErrors.push('「ふりがな」は、「ひらがな」のみ入力可能です。');
          }
          if (control.get('age')?.errors?.['required']) {
            applicantErrors.push('年齢は必須です。');
          }

          // 他のフィールドエラーチェックもここに追加できます。

          errorMessages.push(`申込者 #${index + 1}: ${applicantErrors.join(', ')}`);
        }
      });

      // エラーメッセージを表示するアラートを作成します。
      const alert = await this.alertCtrl.create({
        header: 'エラー',
        message: errorMessages.join('<br>'),
        buttons: ['閉じる']
      });
      await alert.present();
    }
  }


  async confirmAndSubmit() {
    const total = this.applicationForm.value.applicants.length;
    const adultMeals = this.applicationForm.value.applicants.filter((applicant: Applicant) => applicant.mealType === 'adult').length;
    const childMeals = this.applicationForm.value.applicants.filter((applicant: Applicant) => applicant.mealType === 'child').length;

    const alert = await this.alertCtrl.create({
      header: '確認',
      message: `総数: ${total}, 大人食: ${adultMeals}, こども食: ${childMeals}`,
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel'
        }, {
          text: '送信',
          handler: () => {
            this.submitForm();
            this.goBack();
          }
        }
      ]
    });

    await alert.present();
  }


  goBack(): void {
    this.navCtrl.back();
  }
}
