import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Article } from 'src/app/interface/article';
import { ErrorAlertService } from 'src/app/service/alert/error-alert.service';
import { ArticleService } from 'src/app/service/article/article.service';
import { LoadingService } from 'src/app/service/loading/loading.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent {

  articleForm: FormGroup;
  imageUrl: string = '../../../../../assets/にこにこロゴ.png'; // デフォルトの画像のパスをここに設定します。
  image: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  isLoading: boolean = false;

  // 記事のタイプを配列として定義
  articleTypes = [
    { value: 'report', label: '開催報告' },
    { value: 'PR', label: 'PR' },
    { value: 'volunteer', label: 'ボランティア' },
    { value: 'support', label: '寄付や支援' },
    { value: 'topic', label: 'トピック' },
    { value: 'other', label: 'その他' }
  ];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private alertCtrl: AlertController,
    private errorAlertService: ErrorAlertService,
    private loadingService: LoadingService,
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      date: ['', Validators.required],
      types: this.fb.array(this.articleTypes.map(() => false)), // 複数選択のための配列
      place: ['神原にこにこkitchen', Validators.required],
      content: ['', Validators.required],
      image: [this.imageUrl, [Validators.required ]],
    });
  }

  get typesFormArray() {
    return this.articleForm.get('types') as FormArray;
  }

  async onSubmit() {
    if (this.articleForm.valid) {
      const alert = await this.alertCtrl.create({
        header: '確認',
        message: '投稿内容に間違いはありませんか？',
        buttons: [
          {
            text: 'キャンセル',
            role: 'cancel',
          },
          {
            text: '投稿する',
            handler: () => {
              if (this.image) {
                this.submitArticleAndUpload(this.image);
              } else {
                this.submitArticle();
              }
            }
          },
        ]
      });
      await alert.present();
    }
  }


  async confirmAlert() {
    const alert = await this.alertCtrl.create({
      header: '確認',
      message: '投稿内容に間違いはありませんか？',
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
        },
        {
          text: '投稿する',
          handler: () => {
            this.submitArticle();
          }
        },
      ]
    });
    await alert.present();
  }

  // 写真のアップロードと記事のデータを送信するメソッド
  submitArticleAndUpload(image: File) {
    this.loadingService.present('アップロード中...');

    // 画像のアップロードとURLの取得
    this.articleService.uploadImage(image).subscribe({
      next: (imageUrl) => {
        this.imageUrl = imageUrl;
        this.articleForm.patchValue({ image: imageUrl });
        this.loadingService.dismiss();

        // 画像のアップロードが完了したら、記事を送信
        this.submitArticle();
      },
      error: (error) => {
        this.loadingService.dismiss();
        this.errorAlertService.showErrorAlert(error);
      },
    });
  }

  // 記事のデータをアップロードするメソッド。imageUrlやtypeをフォームのデータとして組み込む
  submitArticle() {
    this.loadingService.present('アップロード中...');
    const selectedTypes = this.articleTypes
      .filter((_, i) => this.typesFormArray.value[i])
      .map(type => type.value);
    const formData: Article = {
      ...this.articleForm.value,
      types: selectedTypes,
      imageUrl: this.imageUrl, // 画像のURLをフォームデータに含める
      timestamp: new Date().toISOString(),
    };
    this.articleService.addArticle(formData);
    this.loadingService.dismiss();
    this.articleForm.reset();
    this.image = null;
    this.router.navigate(['/admin/article-list']);
  }


  // ユーザーが画像を選択したときに呼び出されるメソッド
  onImagePicked(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length) {
      const file = target.files[0];
      this.image = file;

      // FileReaderを使用して、選択された画像のプレビューを生成
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // これをテンプレートで表示
      };
      reader.readAsDataURL(file); // 画像ファイルをDataURLとして読み込む
    }
  }



}
