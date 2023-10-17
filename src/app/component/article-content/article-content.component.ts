import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interface/article';
import { ArticleService } from 'src/app/service/article/article.service';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})
export class ArticleContentComponent implements OnInit {
  article: Article | null = null;
  isReady = false;

  private typesData = [
    { type: '開催報告', color: '#ff9365' },
    { type: 'PR', color: '#335cff' },
    { type: 'ボランティア', color: '#00a900' },
    { type: 'ご支援', color: '#ec1800' },
    { type: 'トピック', color: '#8a008a' },
    { type: 'その他', color: '#28acff' }
  ];

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleService.getArticleById(articleId).subscribe(article => {
        this.article = article;
        console.log('記事のタイプ:', this.article!.types);
        console.log(this.article?.imageUrl);
        this.isReady = true;
      });
    }
  }

  getTypesData() {
    return this.typesData;
  }

  getBackgroundColor(type: string): string {
    // 'type'に基づいて一致させています（以前は'label'でした）
    const typeData = this.typesData.find(t => t.type === type);
    return typeData ? typeData.color : 'black';
  }

  // 'type'を直接使用しているため、getLabelメソッドは必要ありません
}
