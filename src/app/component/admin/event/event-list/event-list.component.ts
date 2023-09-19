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

  ngOnInit(): void {
    this.fetchEvents();
  }

  private fetchEvents(): void {
    this.eventFormService.getEventsParams().subscribe(events => {
      this.events = events;
    });
  }
}
