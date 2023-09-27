import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminHomePage } from './admin-home.page';
import { InquiryListComponent } from 'src/app/component/admin/inquiry/inquiry-list/inquiry-list.component';
import { InquiryDetailComponent } from 'src/app/component/admin/inquiry/inquiry-detail/inquiry-detail.component';
import { EventListComponent } from 'src/app/component/admin/event/event-list/event-list.component';
import { ArticleListComponent } from 'src/app/component/admin/article/article-list/article-list.component';
import { EventFormComponent } from 'src/app/component/admin/event/event-form/event-form.component';
import { EventDetailComponent } from 'src/app/component/admin/event/event-detail/event-detail.component';
import { ArticleFormComponent } from 'src/app/component/admin/article/article-form/article-form.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHomePage,
    children: [
      {
        path: '',
        redirectTo: 'event-list',
        pathMatch: 'full'
      },
      {
        path: 'event-list',
        component: EventListComponent,
      },
      {
        path: 'event-form',
        component: EventFormComponent,
      },
      {
        path: 'event-detail/:date',
        component: EventDetailComponent,

      },
      {
        path: 'inquiry-list',
        component: InquiryListComponent,
      },
      {
        path: 'inquiry-detail/:contactId',
        component: InquiryDetailComponent,
      },
      {
        path: 'article-list',
        component: ArticleListComponent,
      },
      {
        path: 'article-form',
        component: ArticleFormComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminHomePageRoutingModule {}
