import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/service/article/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: any =  {};
  originalArticle: any;
  articleID!: string;
  isEditing: boolean = false;
  selectedImage: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private alertController: AlertController,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.fetchArticles();
  }

  fetchArticles(){
    this.articleID = this.route.snapshot.paramMap.get('articleId')!;
    this.articleService.getArticleById(this.articleID).subscribe( data =>
      this.article = data,
    )
  };


  onFileSelected(event: any) {
    this.selectedImage = <File>event.target.files[0];
  }

  async deleteArticle():Promise<void> {
    const alert = await this.alertController.create({
      header: '確認',
      message: `${this.article.title}を削除してもよろしですか`,
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
        },
        {
          text: '削除する',
          handler: () => {
            this.articleService.deleteArticle(this.articleID);
            this.goBack();
          }
        }
      ]
    })
    await alert.present();
  }

  toggleEditMode(event: any) {
    this.isEditing = event.detail.value === 'true';
  }


  saveChanges() {
    if (this.selectedImage) {
      this.articleService.uploadImage(this.selectedImage).subscribe(url => {
        this.article.imageUrl = url;
        this.updateArticleData();
      });
    } else {
      this.updateArticleData();
    }
  }

  async updateArticleData() {
    const alert = await this.alertController.create({
      header: '確認',
      message: '変更した内容を保存しますか？',
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
        },
        {
          text: '保存する',
          handler: () => {
            this.articleService.updateArticle(this.articleID, this.article);
            this.fetchArticles();
          }
        },
      ]
    });
    await alert.present();
  }

  goBack(): void {
    this.navCtrl.back();
  }
}

