import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { register } from 'swiper/element/bundle';
import { SwiperComponent } from '../swiper/swiper.component';
import { VisionComponent } from '../component/vision/vision.component';
// register Swiper custom elements
register();

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    VisionComponent,
    SwiperComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomePageModule {}
