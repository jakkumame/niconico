import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Applicant } from 'src/app/interface/applicant';
import { ApplicationFormService } from 'src/app/service/event/application-form.service';
import { EventFormService } from 'src/app/service/event/event-form.service';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event: any;
  applicants: Applicant[] = [];


  constructor(
    private route: ActivatedRoute,
    private eventFormService: EventFormService,
    private appFormService: ApplicationFormService,

  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('eventId');

    console.log('Event ID:', eventId); // ログを追加

    if (eventId) {
      this.eventFormService.getEventByDate(eventId).pipe(
        map(eventData => eventData as Applicant) // キャストを追加
      ).subscribe(
        (event) => {
          console.log('Fetched Event:', event); // ログを追加
          this.event = event;
        },
        (error) => {
          console.error('Error fetching event:', error); // ログを追加
        }
      );

      this.appFormService.getApplicants(eventId).pipe(
        map(applicantsData => applicantsData as Applicant[]) // キャストを追加
      ).subscribe(
        (applicants) => {
          console.log('Fetched Applicants:', applicants); // ログを追加
          this.applicants = applicants;
        },
        (error) => {
          console.error('Error fetching applicants:', error); // ログを追加
        }
      );
    }
  }

}
