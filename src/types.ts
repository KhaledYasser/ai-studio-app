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
  tags?: string[];
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

export interface GamePageProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: {
    url: string;
    alt: string;
  };
  gameLink: string;
  sourceCodeLink?: string;
  features: Array<{
    title: string;
    description: string;
    items?: string[];
  }>;
  howToPlay: {
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  tips: string[];
  specs: Array<{
    label: string;
    value: string;
  }>;
  relatedGames?: Array<{
    id: string;
    name: string;
    description: string;
    image: string;
    link: string;
  }>;
  shareUrls: Array<{
    icon: string;
    label: string;
    url: string;
  }>;
  gameComponent?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
