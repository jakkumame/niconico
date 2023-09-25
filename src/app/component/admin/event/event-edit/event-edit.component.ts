import { Component, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { EventFormService } from 'src/app/service/event/event-form.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent {
  @Input() eventData: any;

  constructor(
    private modalCtrl: ModalController,
    private eventFormService: EventFormService,
    private alertCtrl: AlertController,
  ) { }

  saveChanges(): void {
    this.eventFormService.updateEvent(this.eventData.eventId, this.eventData).then(() => {
      this.modalCtrl.dismiss({ updated: true });
    }).catch(error => {
      console.error("Error updating event: ", error);
    });
  }

  async confirmSave(): Promise<void> {
    const confirmAlert = await this.alertCtrl.create({
      header: '確認',
      message: `本当に${this.eventData.date}の内容を変更してもよろしいですか？`,
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel'
        },
        {
          text: '保存する',
          handler: () => {
            this.saveChanges();
          }
        },
      ]
    });
    await confirmAlert.present();
  }

  closeModal(): void {
    this.modalCtrl.dismiss();
  }
}
