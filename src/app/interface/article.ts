export interface Article {
  title: string;
  subtitle: string;
  date: string;
  content: string;
  types: string[];
  place: string;
  imageUrl: string;
  timestamp?: Date;
  articleId?: string;
}

