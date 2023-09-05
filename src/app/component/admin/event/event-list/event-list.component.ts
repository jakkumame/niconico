import { Component, OnInit } from '@angular/core';
import { EventFormService } from 'src/app/service/event/event-form.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: any[] = [];

  constructor(private eventFormService: EventFormService) { }

  async ngOnInit() {
    await this.fetchEvents();
  }

  private async fetchEvents(): Promise<void> {
    try {
        this.events = await this.eventFormService.getEvents();
    } catch (error) {
        console.error('Eventsの取得中にエラーが発生しました:', error);
    }
  }
}
