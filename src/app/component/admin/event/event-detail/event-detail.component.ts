// event-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventFormService } from 'src/app/service/event/event-form.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event: any;

  constructor(
    private route: ActivatedRoute,
    private eventFormService: EventFormService
  ) {}

  ngOnInit(): void {
    const eventDate = this.route.snapshot.paramMap.get('date');
    if (eventDate) {
      this.eventFormService.getEventByDate(eventDate).subscribe(event => {
        this.event = event;
      });
    }
  }
}
