import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactPageRoutingModule } from './contact-routing.module';

import { ContactPage } from './contact.page';
import { PrivacyPolicyComponent } from '../component/privacy-policy/privacy-policy.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ContactPageRoutingModule
  ],
  declarations: [
    ContactPage,
    PrivacyPolicyComponent]
})
export class ContactPageModule {}
