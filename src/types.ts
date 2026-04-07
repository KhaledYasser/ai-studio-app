export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
  image: string;
}

export interface AppProject {
  id: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  status: 'Live' | 'Beta' | 'Concept';
}
