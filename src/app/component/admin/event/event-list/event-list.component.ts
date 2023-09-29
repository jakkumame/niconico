import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { EventFormService } from 'src/app/service/event/event-form.service';
import { EventEditComponent } from '../event-edit/event-edit.component';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: any[] = [];

  constructor(
    private eventFormService: EventFormService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    ) { }

  async ngOnInit(): Promise<void> {
    await this.fetchEvents();
  }

  async fetchEvents(): Promise<void> {
    this.events = await this.eventFormService.getEventsParams();
  }

  async deleteEvent(eventId: string, date: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: '確認',
      message: `子ども食堂 開店日【${date}】を削除してもよろしいですか？`,
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
        },
        {
          text: '削除する',
          handler: () => {
            this.eventFormService.deleteEvent(eventId).then(() => {
              // 成功時の処理（例：イベントリストを再取得）
              this.fetchEvents();
            }).catch(error => {
              // エラー時の処理
              console.error("Error deleting event: ", error);
              this.showErrorAlert();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async openEditModal(event: any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EventEditComponent,
      componentProps: {
        eventData: event
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.updated) {
      this.fetchEvents();
    }
  }

  async showErrorAlert(): Promise<void> {
    const errorAlert = await this.alertCtrl.create({
      header: 'エラー',
      message: '実行中にエラーが発生しました。',
      buttons: ['OK']
    });

    await errorAlert.present();
  }



}
