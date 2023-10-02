import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/service/article/article.service';

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
  ) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe( data => {
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


}
