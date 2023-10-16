import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { ArticleService } from 'src/app/service/article/article.service';
import { Article } from 'src/app/interface/article';
import { LoadingService } from 'src/app/service/loading/loading.service';
import { AlertService } from 'src/app/service/alert/alert.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  articleForm!: FormGroup;
  article!: Article;  // 編集する記事のデータ
  articleID!: string;
  articleTypes: string[] = [];
  // UI用の定義
  allArticleTypes: string[] = ['開催報告', 'PR', 'ボランティア', '寄付や支援', 'トピック', 'その他'];


  imageChanged: boolean = false;  // 画像が変更されたかを追跡するフラグ
  newImageFile!: File;  // 新しい画像ファイルを保持


  isEditing: boolean = false;

  // 定数の定義
  readonly EDIT_MODE = 'true';
  readonly PREVIEW_MODE = 'false';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingService: LoadingService,
    private alertService: AlertService,
  ) {
    this.articleForm = this.fb.group({
      title: [''],
      subtitle: [''],
      date: [''],
      place: [''],
      types: this.fb.array(this.articleTypes.map(() => new FormControl(false))), // チェックボックス用
      content: [''],
      imageUrl: [''],
    });
  }

  ngOnInit() {
    // 固定の記事タイプを設定。UIとの齟齬を確認しておく
    this.articleTypes = ['開催報告', 'PR', 'ボランティア', '寄付や支援', 'トピック', 'その他'];

    // URLからarticleIdを取得
    const articleId = this.route.snapshot.paramMap.get('articleId');
    if (articleId) {
      this.articleID = articleId;
      this.getArticle(articleId);
    }
  }

  // 既存の記事を取得,再取得時のためメソッド化
  async getArticle(id: string) {
    try {
      this.loadingService.present('読み込み中...');
      this.article = await firstValueFrom(this.articleService.getArticleById(id));
      this.setFormValues(this.article);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      this.loadingService.dismiss();
    }
  }


  // フォームに記事データをセット
  setFormValues(article: Article) {
    // チェックボックス用のデータを処理
    const typesControls = this.articleTypes.map(type => this.article.types.includes(type));
    this.articleForm.setControl('types', this.fb.array(typesControls.map(item => new FormControl(item))));

    this.articleForm.patchValue({
      title: article.title,
      subtitle: article.subtitle,
      date: article.date,
      place: article.place,
      content: article.content,
      imageUrl: article.imageUrl,
    });
  }



  // 画像ファイルが変更されたときのイベントハンドラ
  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.newImageFile = input.files[0]; // 新しい画像ファイルを保持
      this.imageChanged = true; // 画像が変更されたことを示すフラグをセット

      // ファイルリーダーを使用してローカルで画像をプレビュー
      const reader = new FileReader();
      reader.onload = () => {
        this.articleForm.patchValue({
          imageUrl: reader.result // 画像のプレビュー用のURL
        });
      };
      reader.readAsDataURL(this.newImageFile);
    }
  }


// 画像のURLを設定
async setImageURL() {
  if (this.imageChanged) { // 画像が変更された場合のみ処理
    try {
      const url = await this.articleService.uploadImage(this.newImageFile).toPromise();
      this.articleForm.patchValue({ imageUrl: url }); // リアルなURLで更新
    } catch (error) {
      console.error('set imageUrl error', error);
      this.alertService.showErrorAlert('写真のURLの取得に失敗しました。');
    }
  } else {
    this.alertService.showErrorAlert('画像が変更されていません。');
  }
}

async submitAlert() {
  const alert = await this.alertCtrl.create({
    header: '確認',
    message: '変更を保存してもよろしいですか？',
    buttons: [
      {
        text: 'キャンセル',
        role: 'cancel'
      },
      {
        text: '保存する',
        handler: () => {
          this.submit();
          this.isEditing = false;
        }
      },
    ]
  })
  await alert.present();
}


// // フォームの送信
// async submit() {
//   // フォームからデータを取得
//   const formValue = this.articleForm.value;

//   // チェックボックスのデータを変換
//   const selectedTypes = (this.articleForm.get('types') as FormArray).controls
//     .map((ctrl, i) => ctrl.value ? this.articleTypes[i] : null)
//     .filter(v => v !== null);

//   // setImageURLが成功するまで待機し、エラーがあれば処理を中断
//   try {
//     await this.setImageURL(); // ここでアップロードとURLの取得を待機
//   } catch (error) {
//     return; // エラーがあれば、ここでsubmit処理を終了
//   }

//   const newArticleData = {
//     ...formValue,
//     types: selectedTypes,
//     timestamp: new Date().toISOString(),
//   };
//   // 記事を更新
//   this.articleService.updateArticle(this.articleID, newArticleData);
//   }


  async submit() {
    try {
      // ローディングインジケータ表示
      await this.loadingService.present('送信中...');

      // フォームからデータを取得
      const formValue = this.articleForm.value;

      // チェックボックスのデータを変換
      const selectedTypes = (this.articleForm.get('types') as FormArray).controls
        .map((ctrl, i) => ctrl.value ? this.articleTypes[i] : null)
        .filter(v => v !== null);

      // setImageURLが成功するまで待機し、エラーがあれば処理を中断
      await this.setImageURL(); // ここでアップロードとURLの取得を待機

      const newArticleData = {
        ...formValue,
        types: selectedTypes,
        timestamp: new Date().toISOString(),
      };

      // 記事を更新
      await this.articleService.updateArticle(this.articleID, newArticleData);

      // 成功アラートを表示
      await this.alertService.showCompletedAlert('記事が更新されました。');

    } catch (error) {
      // エラーアラートを表示
      await this.alertService.showErrorAlert('更新に失敗しました。');
    } finally {
      // ローディングインジケータを非表示
      await this.loadingService.dismiss();
    }
  }






  // モードの切り替え。変更があれば、アラート表示
  async toggleEditMode(event: any) {
    if (this.isEditing && this.articleForm.dirty) {
      await this.changeModeAlert();
    } else {
      // 定数を使用してモードを切り替える
      this.isEditing = event.detail.value === this.EDIT_MODE;
    }
  }

  // 未保存の変更に対するアラートを表示
  async changeModeAlert() {
    const alert = await this.alertCtrl.create({
      header: '変更を保存しますか？',
      message: '編集中の変更内容が保存されていません。保存しますか？',
      buttons: [
        { text: 'キャンセル',role: 'cancel', },
        {
          text: '保存せずに終了',
          handler: () => {
            this.isEditing = false;
          }
        },
        {
          text: '保存',
          handler: () => {
            this.submit();
            this.isEditing = false;
          }
        }
      ]
    });

    await alert.present();
  }

  // 前のページに戻る
  goBack(): void {
    this.navCtrl.navigateRoot('/admin/article-list');
  }
}
