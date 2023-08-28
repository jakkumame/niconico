import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventFormService } from 'src/app/service/event/event-form.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventFormService: EventFormService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.eventForm = this.fb.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.eventForm.valid) {
      try {
        await this.eventFormService.addEvent(this.eventForm.value);
        this.showAlert('成功', 'こども食堂の新しい開催詳細が作成されました');
        this.eventForm.reset();
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : '予期せぬエラーが発生しました。';
        this.showAlert('エラー', errorMessage);
      }
    }
  }

  private async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goBack(): void {
    this.navCtrl.back();
  }
}
