import { ArticleTypeService } from './../../../../service/article/article-type.service';
import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/service/article/article.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  providers: [ DatePipe ]
})
export class ArticleDetailComponent implements OnInit {
  article: any =  {};
  originalArticle: any;
  articleID!: string;
  isEditing: boolean = false;
  imageChanged: boolean = false;
  selectedImage: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private typeService: ArticleTypeService,
  ) {}

  ngOnInit() {
    this.fetchArticles();
  }

  fetchArticles(){
    this.articleID = this.route.snapshot.paramMap.get('articleId')!;
    this.articleService.getArticleById(this.articleID).subscribe( data => {
      this.article = data
    })
  };


  onFileSelected(event: any) {
    this.selectedImage = <File>event.target.files[0];
  }

  async deleteArticle(id: string):Promise<void> {
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
            this.articleService.deleteArticle(id);
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
      this.articleService.uploadImage(this.selectedImage, this.article.date).subscribe(url => {
        this.article.imageUrl = url;
        this.updateArticleData();
        this.fetchArticles();
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
            this.isEditing = false;
          }
        },
      ]
    });
    await alert.present();
  }

  getBackgroundColor(type: string): string {
    return this.typeService.getBackgroundColor(type);
  }

  getLabel(type: string): string {
    return this.typeService.getLabel(type);
  }


  goBack(): void {
    this.navCtrl.navigateRoot('/admin/article-list');
  }
}

