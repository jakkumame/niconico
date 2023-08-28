// event-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventFormService } from 'src/app/service/event/event-form.service';
import { AlertController } from '@ionic/angular';

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
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.eventForm = this.fb.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.eventForm.valid) {
        try {
            await this.eventFormService.addEvent(this.eventForm.value);
            this.eventForm.reset();
            const alert = await this.alertController.create({
                header: '成功',
                message: 'こども食堂の新しい開催詳細が作成されました',
                buttons: ['OK']
            });
            await alert.present();
        } catch (error: unknown) {
            let errorMessage: string;

            if (error instanceof Error) {
                errorMessage = error.message;
            } else {
                errorMessage = '予期せぬエラーが発生しました。';
            }

            const alert = await this.alertController.create({
                header: 'エラー',
                message: errorMessage,
                buttons: ['OK']
            });
            await alert.present();
        }
    }
}


}
