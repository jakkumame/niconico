import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminHomePageRoutingModule } from './admin-home-routing.module';

import { AdminHomePage } from './admin-home.page';
import { LoginComponent } from 'src/app/component/login/login.component';
import { InquiryListComponent } from 'src/app/component/admin/inquiry/inquiry-list/inquiry-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AdminHomePageRoutingModule
  ],
  declarations: [
    AdminHomePage,
    LoginComponent,
    InquiryListComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe]
})
export class AdminHomePageModule {}
