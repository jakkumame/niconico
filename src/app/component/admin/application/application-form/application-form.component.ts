import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApplicationFormService } from 'src/app/service/event/application-form.service';
import { AlertController, NavController } from '@ionic/angular';
import { Applicant } from "src/app/interface/applicant";
import { hiraganaValidator } from 'src/app/validators/application.validator';
import { CookieService } from 'src/app/service/cookie/cookie.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
  providers: [ DatePipe ]
})
export class ApplicationFormComponent implements OnInit {

  applicationForm: FormGroup;
  availableTimes: string[] = [];
  availableEvents: any[] = [];

  constructor(
    private fb: FormBuilder,
    private appFormService: ApplicationFormService,
    private cookie: CookieService,
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

    this.cookie.set("cookieName", "cookieValue", "SameSite=Strict");
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

  async sendValue(): Promise<void> {
    if (this.applicationForm.valid) {
      await this.submitApplications();
      this.resetForm();
    } else {
      const errorMessages = this.generateErrorMessages();
      await this.showErrorMessageAlert(errorMessages);
    }
  }

  private async submitApplications(): Promise<void> {
    const selectedEvent = this.applicationForm.value.selectedEvent;
    const submissionPromises = this.applicationForm.value.applicants.map(
      (applicant: Applicant) => this.appFormService.submitApplication(selectedEvent, applicant)
    );
    try {
      await Promise.all(submissionPromises);
    } catch (error) {
      console.error('Error while submitting application:', error);
      await this.showErrorSubmissionAlert();
    }
  }

  private resetForm(): void {
    this.applicationForm.reset();
    this.applicationForm.setControl('applicants', this.fb.array([this.createApplicantForm()]));
  }

  private generateErrorMessages(): string[] {
    const errorMessages: string[] = [];
    const controls = this.applicationForm.controls;

    // selectedEventのエラーチェック
    if (controls['selectedEvent'].errors) {
      if (controls['selectedEvent'].errors['required']) {
        errorMessages.push('来店日を選択してください。');
      }
      // 他のselectedEventのエラーチェックもここに追加できます。
    }

    // 各申込者のエラーチェック
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

        if (applicantErrors.length) {
          errorMessages.push(`申込者 #${index + 1}: ${applicantErrors.join(', ')}`);
        }
      }
    });

    return errorMessages;
  }

  private async showErrorMessageAlert(messages: string[]): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: '入力エラー',
      message: messages.join(''),
      buttons: ['閉じる']
    });
    await alert.present();
  }

  private async showErrorSubmissionAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: '送信エラー',
      message: '申し込みの送信中にエラーが発生しました。もう一度お試しください。',
      buttons: ['閉じる']
    });
    await alert.present();
  }


  goBack(): void {
    this.navCtrl.navigateForward('/home');
  }
}
