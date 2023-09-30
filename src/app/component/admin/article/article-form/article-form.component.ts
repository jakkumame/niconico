import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/interface/article';
import { ArticleService } from 'src/app/service/article/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent  {

  articleForm: FormGroup;
  imageUrl: string | null = null;
  image: File | null = null;

  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.articleForm.valid && this.image) {
      this.articleService.uploadImage(this.image).subscribe(imageUrl => {
        const formData: Article = {
          ...this.articleForm.value,
          imageUrl: imageUrl
        };
        this.articleService.addArticle(formData);
      });
    }
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.image = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // 画像のデータをセット
      };
      reader.readAsDataURL(file);
    }
  }

}
