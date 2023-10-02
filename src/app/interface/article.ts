export interface Article {
  title: string;
  subtitle: string;
  content: string;
  type: string;
  place: string;
  imageURL: string;
  timestamp?: Date;
  articleId?: string;
}

