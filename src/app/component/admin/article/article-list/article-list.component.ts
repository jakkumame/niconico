import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/service/article/article.service';
import { AlertService } from 'src/app/service/alert/alert.service';
import { LoadingService } from 'src/app/service/loading/loading.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  providers:  [ DatePipe ]
})
export class ArticleListComponent implements OnInit {

  articles: any[] = [];

  constructor(
    private articleService: ArticleService,
    private alertCtrl: AlertController,
    private loadingService: LoadingService,
  private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.loadArticles(); // 記事をロードするために共通メソッドを使用
  }

  // 記事の取得とソートのロジックを持つメソッド。記事の初期化、更新用
  loadArticles(): void {
    this.articleService.getArticles().subscribe(data => {
      const sortedArticles = data.sort((a, b) => {
        const dateA = new Date(a.timestamp!);
        const dateB = new Date(b.timestamp!);
        return dateB.getTime() - dateA.getTime();
      })
      this.articles = sortedArticles;
    });
  }



  getTypeLabel(type: string): string {
    switch (type) {
      case 'report': return '開催報告';
      case 'PR': return 'PR';
      case 'volunteer': return 'ボランティア';
      case 'support': return 'ご支援';
      case 'information': return '情報発信';
      case 'topic': return 'トピック';
      case 'other': return 'そのほか';
      default: return '不明なお問い合わせ（エラー）';
    }
  }

  // 記事の削除
  async deleteArticle(id: string, title: string) {
    const alert = await this.alertCtrl.create({
      header: '確認',
      message: `こちらの記事（${title}）を削除しますか？`,
      buttons: [
        { text: 'キャンセル', role: 'cancel', },
        {
          text: '削除する',
          handler: async () => {
            try {
              await this.loadingService.present('削除中...'); // ローディングを開始

              // 削除処理を実行
              await this.articleService.deleteArticle(id);


              await this.loadingService.dismiss(); // ローディングを終了
              await this.alertService.showCompletedAlert('削除が完了しました。'); // 完了アラートを表示
              this.loadArticles(); // 記事リストを更新
            } catch (error) {
              await this.loadingService.dismiss(); // ローディングを終了
              await this.alertService.showErrorAlert('削除中にエラーが発生しました。'); // エラーアラートを表示
            }
          }
        },
      ]
    });
    await alert.present();
  }

}
