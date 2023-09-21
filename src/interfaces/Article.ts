export interface ArticleApi {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  eatured: boolean;
}

export interface ArticleDetailsProps {
  articleId: string;
}
