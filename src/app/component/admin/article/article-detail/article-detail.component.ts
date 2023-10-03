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
  selectedImage: File | null = null;

  typesData = [
    { value: 'report', label: '開催報告' },
    { value: 'PR', label: 'PR' },
    { value: 'volunteer', label: 'ボランティア' },
    { value: 'support', label: 'ご支援' },
    { value: 'topic', label: 'トピック' },
    { value: 'other', label: 'その他' }
  ];

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private datePipe: DatePipe
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
      this.articleService.uploadImage(this.selectedImage).subscribe(url => {
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
          }
        },
      ]
    });
    await alert.present();
  }

  getBackgroundColor(type: string): string {
    switch(type) {
      case 'report': return '#ffa680';
      case 'PR': return '#335cff';
      case 'volunteer': return '#00a900';
      case 'support': return '#ec1800';
      case 'topic': return '#8a008a';
      case 'other': return '#28acff';
      default: return 'black';
    }
  }

  getLabel(type: string): string {
    const typeData = this.typesData.find(t => t.value === type);
    return typeData ? typeData.label : type;
  }


  goBack(): void {
    this.navCtrl.navigateRoot('/admin/article-list');
  }
}

