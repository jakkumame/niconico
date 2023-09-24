import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { EventFormService } from 'src/app/service/event/event-form.service';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: any[] = [];

  constructor(
    private eventFormService: EventFormService,
    private alertCtrl: AlertController) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  private fetchEvents(): void {
    this.eventFormService.getEventsParams().subscribe(events => {
      this.events = events;
    });
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

  async showErrorAlert(): Promise<void> {
    const errorAlert = await this.alertCtrl.create({
      header: 'エラー',
      message: 'イベントの削除中にエラーが発生しました。',
      buttons: ['OK']
    });

    await errorAlert.present();
  }



}
