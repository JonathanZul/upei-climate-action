export const POSTS_PER_PAGE = 10;

export interface Tag {
  _id: string;
  title: string;
  slug: string;
}

export interface Post {
  _id: string;
  title: string;
  author: string;
  publishedAt: string;
  image: object;
  excerpt: string;
  slug: string;
  tags: Tag[];
}

export interface FormattedPost {
  _id: string;
  title: string;
  author: string;
  date: string;
  image?: object | null;
  excerpt: string;
  slug: string;
  tags: Tag[];
  primaryTag?: Tag;
}