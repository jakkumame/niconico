import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // <-- Router, NavigationEndをインポート

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  slides: any;

  constructor(private router: Router) {} // <-- Routerをインジェクト

  ngOnInit(): void {
    this.slides = [
      {swiper: '../../assets/gallery(example).png'},
      {swiper: '../../assets/dining.svg'},
      {swiper: '../../assets/play-room.svg'},
    ];

    // ルーティングイベントの変更を監視
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToFragment(this.router.url.split('#')[1]);
      }
    });
  }

  // 指定されたセクションにスクロールするためのヘルパー関数
  scrollToFragment(fragment: string): void {
    if (fragment) {
      const el = document.getElementById(fragment);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
