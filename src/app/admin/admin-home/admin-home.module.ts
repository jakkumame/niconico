import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AdminHomePageRoutingModule } from './admin-home-routing.module';



import { AdminHomePage } from './admin-home.page';
import { LoginComponent } from 'src/app/component/login/login.component';
import { InquiryListComponent } from 'src/app/component/admin/inquiry/inquiry-list/inquiry-list.component';
import { InquiryDetailComponent } from 'src/app/component/admin/inquiry/inquiry-detail/inquiry-detail.component';
import { EventListComponent } from 'src/app/component/admin/event/event-list/event-list.component';
import { EventFormComponent } from 'src/app/component/admin/event/event-form/event-form.component';
import { EventDetailComponent } from 'src/app/component/admin/event/event-detail/event-detail.component';
import { EventEditComponent } from 'src/app/component/admin/event/event-edit/event-edit.component';
import { ApplicationFormComponent } from 'src/app/component/admin/application/application-form/application-form.component';
import { ArticleListComponent } from 'src/app/component/admin/article/article-list/article-list.component';
import { ArticleFormComponent } from 'src/app/component/admin/article/article-form/article-form.component';
import { ArticleEditComponent } from 'src/app/component/admin/article/article-edit/article-edit.component';
import { ArticleDetailComponent } from 'src/app/component/admin/article/article-detail/article-detail.component';
import { GeneralMappingPipe } from 'src/app/pipes/meal-type.pipe';

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
    InquiryDetailComponent,
    EventListComponent,
    EventFormComponent,
    EventDetailComponent,
    EventEditComponent,
    ApplicationFormComponent,
    ArticleListComponent,
    ArticleFormComponent,
    ArticleEditComponent,
    ArticleDetailComponent,
    GeneralMappingPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe]
})
export class AdminHomePageModule {}
