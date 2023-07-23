import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  slides: any
  constructor() {
  }

  ngOnInit(): void {
    this.slides = [
      {swiper: '../../assets/gallery(example).png'},
      {swiper: '../../assets/dining.svg'},
      {swiper: '../../assets/play-room.svg'},
    ];
  }
}
