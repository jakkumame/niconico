import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Error403PageRoutingModule } from './error403-routing.module';

import { Error403Page } from './error403.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Error403PageRoutingModule
  ],
  declarations: [Error403Page]
})
export class Error403PageModule {}
