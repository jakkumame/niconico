import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  // 記事のタイプを配列として定義
  articleTypes = [
    { value: 'report', label: '開催報告' },
    { value: 'PR', label: 'PR' },
    { value: 'volunteer', label: 'ボランティア' },
    { value: 'support', label: '寄付や支援' },
    { value: 'information', label: '情報発信' },
    { value: 'topic', label: 'トピック' },
    { value: 'other', label: 'その他' }
  ];



  constructor(private fb: FormBuilder, private articleService: ArticleService, private router: Router,) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      types: this.fb.array(this.articleTypes.map(() => false)), // 複数選択のための配列
      place: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  get typesFormArray() {
    return this.articleForm.get('types') as FormArray;
  }

  onSubmit() {
    if (this.articleForm.valid && this.image) {
      this.articleService.uploadImage(this.image).subscribe(imageUrl => {
        const selectedTypes = this.articleTypes
          .filter((_, i) => this.typesFormArray.value[i])
          .map(type => type.value);
        const formData: Article = {
          ...this.articleForm.value,
          types: selectedTypes,
          imageUrl: imageUrl,
          timestamp: new Date(),
        };
        this.articleService.addArticle(formData);
        this.articleForm.reset();
        this.image = null;
        this.router.navigate(['/admin/article-list']);
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
