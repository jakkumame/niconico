import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminHomePage } from './admin-home.page';
import { InquiryListComponent } from 'src/app/component/admin/inquiry/inquiry-list/inquiry-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHomePage,
    children: [
      {
        path: 'inquiry-list',
        component: InquiryListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminHomePageRoutingModule {}
