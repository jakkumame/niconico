import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { register } from 'swiper/element/bundle';
import { SwiperComponent } from '../swiper/swiper.component';
import { VisionComponent } from '../component/vision/vision.component';
import { ArticlePlaceComponent } from '../component/article-place/article-place.component';
import { SupportComponent } from '../component/support/support.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapComponent } from '../google-map/google-map.component';
// register Swiper custom elements
register();

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleMapsModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    GoogleMapComponent,
    ArticlePlaceComponent,
    VisionComponent,
    SwiperComponent,
    SupportComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomePageModule {}
