import { Component, Input, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent  implements OnInit {

  @Input() slides: any[] = [];

  swiperModules = [IonicSlides];

  constructor() { }

  ngOnInit() {}

}
