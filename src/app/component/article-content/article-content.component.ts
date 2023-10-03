import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interface/article';
import { ArticleTypeService } from 'src/app/service/article/article-type.service';
import { ArticleService } from 'src/app/service/article/article.service';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})
export class ArticleContentComponent implements OnInit {
  article: Article | null = null;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private typeService: ArticleTypeService,

  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      // articleIdに基づいて記事の詳細を取得
      this.articleService.getArticleById(articleId).subscribe(article => {
        this.article = article;
      });
    }
  }

  getBackgroundColor(type: string): string {
    return this.typeService.getBackgroundColor(type);
  }

  getLabel(type: string): string {
    return this.typeService.getLabel(type);
  }

}
