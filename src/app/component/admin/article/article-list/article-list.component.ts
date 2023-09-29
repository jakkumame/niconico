import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/service/article/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles: any[] = [];


  constructor(
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        };
      });
    });
  }

}
