import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminHomePage } from './admin-home.page';
import { InquiryListComponent } from 'src/app/component/admin/inquiry/inquiry-list/inquiry-list.component';
import { InquiryDetailComponent } from 'src/app/component/admin/inquiry/inquiry-detail/inquiry-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHomePage,
    children: [
      {
        path: 'inquiry-list',
        component: InquiryListComponent,
      },
      {
        path: 'inquiry-detail/:key',
        component: InquiryDetailComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminHomePageRoutingModule {}
