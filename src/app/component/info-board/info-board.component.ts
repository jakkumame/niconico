import { Article } from './../../interface/article';
import { ArticleService } from './../../service/article/article.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-board',
  templateUrl: './info-board.component.html',
  styleUrls: ['./info-board.component.scss']
})
export class InfoBoardComponent implements OnInit {
  articles: any;

  constructor(
    private articleService: ArticleService,
  ) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe( data => {
      this.articles = data.sort((a, b) => {
        const dateA = new Date(a.timestamp!);
        const dateB = new Date(b.timestamp!);
        return dateB.getTime() - dateA.getTime(); // 新しい日付順にソート
      });
    });
  }

  // 現在から2ヶ月以内であるかどうかをチェックするメソッド
  isNew(timestampStr: string): boolean {
    const timestamp = new Date(timestampStr); // 文字列をDateオブジェクトに変換

    const today = new Date();
    const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());

    const articleDate = new Date(timestamp.getFullYear(), timestamp.getMonth(), timestamp.getDate());

    const result = articleDate > twoMonthsAgo;
    return result;
  }



}
