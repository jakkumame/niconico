import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // <-- Router, NavigationEndをインポート
import { MenuController } from '@ionic/angular';
import { IonFab } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  slides: any;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    ) {}

  ngOnInit(): void {
    // ルーティングイベントの変更を監視
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToFragment(this.router.url.split('#')[1]);
      }
    });
  }


  // footer componentがメニュー画面でメニューを閉じる
  async closeMenu() {
    await this.menuCtrl.close();
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
