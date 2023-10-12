import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ArticleService } from 'src/app/service/article/article.service';
import { ArticleTypeService } from './../../../../service/article/article-type.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  articleForm: FormGroup;
  articleID!: string;
  isEditing: boolean = false;
  articleTypes: any[] = [];
  selectedImage: File | null = null;
  selectedTypes: string[] = [];

  // 定数の定義
  readonly EDIT_MODE = 'true';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private typeService: ArticleTypeService,
    private loadingCtrl: LoadingController,
  ) {
    // FormGroupの初期化
    this.articleForm = this.fb.group({
      title: [''],
      subtitle: [''],
      date: [''],
      place: [''],
      types: this.fb.array([]),
      content: [''],
      imageUrl: [''],
      timestamp: ['']
    });
  }

  ngOnInit() {
    // 記事のIDを取得
    const articleId = this.route.snapshot.paramMap.get('articleId');
    this.articleID = articleId!;
    if (articleId) {
      this.loadArticle(articleId);
    }
  }

  loadArticle(articleId: string) {
    // 記事データを取得してフォームにセット
    this.articleService.getArticleById(articleId).subscribe(article => {
      this.articleForm.patchValue(article);
      this.selectedTypes = article.types; // 選択されたタイプを保存
      this.initializeArticleTypes(article.types);
    });
  }


  // ファイル選択イベントのハンドラ
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }

  // 記事のタイプのチェックボックスを初期化
  initializeArticleTypes(selectedTypes: string[]) {
    this.articleTypes = this.typeService.getTypesData();
    const formArray = this.articleForm.get('types') as FormArray;

    this.articleTypes.forEach(type => {
      formArray.push(this.fb.control(selectedTypes.includes(type.value)));
    });
  }

  // モードの切り替え。変更があれば、アラート表示
  async toggleEditMode(event: any) {
    if (this.isEditing && this.articleForm.dirty) {
      await this.presentUnsavedChangesAlert();
    } else {
      // 定数を使用してモードを切り替える
      this.isEditing = event.detail.value === this.EDIT_MODE;
    }
  }

  // 未保存の変更に対するアラートを表示
  async presentUnsavedChangesAlert() {
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
            this.saveChanges();
            this.isEditing = false;
          }
        }
      ]
    });

    await alert.present();
  }

  // フォームの送信処理
  async onSubmit() {
    if (!this.articleForm.valid) {
      // バリデーションエラーを処理する
      return;
    }

    let imageUrl = await this.handleImageUpload();

    const finalArticle = this.constructArticleObject(imageUrl);

    // 記事の更新または作成処理...
  }

  async handleImageUpload(): Promise<string> {
    if (!this.selectedImage) {
      return this.articleForm.value.imageUrl; // 既存の画像URLを返す
    }

    return await this.uploadImageAndGetUrl(this.selectedImage);
  }

  constructArticleObject(imageUrl: string) {
    const selectedTypes = this.getSelectedTypes();

    return {
      ...this.articleForm.value,
      imageUrl, // 新しい画像URLを使用
      types: selectedTypes
    };
  }

  getSelectedTypes(): string[] {
    return this.articleForm.value.types
      .map((checked: boolean, i: number) => checked ? this.articleTypes[i].value : null)
      .filter((v: null | string) => v !== null);
  }


  // 画像をアップロードし、ダウンロードURLを取得する関数
  async uploadImageAndGetUrl(image: File): Promise<string> {
    try {
      const imageUrlObservable = this.articleService.uploadImage(image);
      const imageUrl = await imageUrlObservable.toPromise();
      return imageUrl ?? '';
    } catch (error) {
      console.error('Error uploading image:', error);
      await this.presentAlert('エラー', '画像のアップロード中に問題が発生しました。', [{ text: 'OK' }]);
      return '';
    }
  }

  // アラートの表示をヘルパーメソッドとして抽出
  async presentAlert(header: string, message: string, buttons: any[]) {
    const alert = await this.alertCtrl.create({ header, message, buttons });
    await alert.present();
  }

  // 記事の変更を保存
  async saveChanges() {
    if (this.articleForm.valid) {
      const updatedArticle = this.articleForm.value;

      try {
        // updateArticleメソッドの完了を待つ
        await this.articleService.updateArticle(this.articleID, updatedArticle);
        this.loadArticle(this.articleID);
        this.isEditing = false;
      } catch (error) {
        console.error('Error updating article:', error);
        // エラーが発生した場合、ユーザーにアラートを表示
        await this.presentAlert('エラー', '記事の変更を保存中にエラーが発生しました。', [{ text: 'OK' }]);
      }
    } else {
      // フォームが無効な場合のエラー処理
      await this.presentAlert('エラー', '入力項目に無効な値があります。', [{ text: 'OK' }]);
    }
  }

  // 記事の削除
  async deleteArticle(id: string): Promise<void> {
    console.log(`Attempting to delete article with id: ${id}`);
    const alert = await this.alertCtrl.create({
      header: '確認',
      message: `${this.articleForm.value.title}を削除してもよろしいですか？`, // フォームからタイトルを取得
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
        },
        {
          text: '削除する',
          handler: async () => { // このハンドラを非同期にします
            const loading = await this.loadingCtrl.create({
              message: '削除中...', // ここに表示したいメッセージを設定します
            });
            await loading.present();

            try {
              await this.articleService.deleteArticle(id);
              await loading.dismiss(); // 非同期処理が成功したら、ローディングを閉じます
              this.goBack(); // 削除後、前のページに戻る
            } catch (error) {
              await loading.dismiss(); // エラーが発生した場合も、ローディングを閉じます
              console.error('Error deleting article:', error);
              // エラーが発生した場合、ユーザーにアラートを表示
              await this.presentAlert('エラー', '記事の削除中にエラーが発生しました。', [{ text: 'OK' }]);
            }
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
