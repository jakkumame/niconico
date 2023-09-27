import { ArticleService } from './../../../../service/article/article.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit {

  articleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.articleForm.valid) {
      console.log('Form Data:', this.articleForm.value);
      this.articleService.addArticle(this.articleForm);
    }
  }

}
