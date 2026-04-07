import { Article, AppProject } from './types';

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Future of Generative AI in Web Development',
    excerpt: 'Exploring how LLMs are reshaping the way we build, test, and deploy modern web applications.',
    category: 'AI & ML',
    date: 'Oct 12, 2023',
    readTime: '8 min read',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    image: 'https://picsum.photos/seed/ai-web/800/600'
  },
  {
    id: '2',
    title: 'Mastering Edge Computing with Modern Frameworks',
    excerpt: 'Why latency matters more than ever and how to leverage edge functions for global performance.',
    category: 'Architecture',
    date: 'Oct 10, 2023',
    readTime: '12 min read',
    author: {
      name: 'Marcus Thorne',
      avatar: 'https://i.pravatar.cc/150?u=marcus'
    },
    image: 'https://picsum.photos/seed/edge/800/600'
  },
  {
    id: '3',
    title: 'Sustainable Coding: Reducing Your Digital Footprint',
    excerpt: 'Practical tips for optimizing code efficiency to minimize server energy consumption.',
    category: 'Sustainability',
    date: 'Oct 08, 2023',
    readTime: '6 min read',
    author: {
      name: 'Elena Rodriguez',
      avatar: 'https://i.pravatar.cc/150?u=elena'
    },
    image: 'https://picsum.photos/seed/green/800/600'
  }
];

export const APPS: AppProject[] = [
  {
    id: '1',
    name: 'Invadors',
    description: 'Classic Space Invaders game built with React. Test your reflexes and defend against endless waves of aliens.',
    tags: ['React', 'TypeScript', 'Game Dev'],
    image: '/invadors-logo.png',
    link: 'http://invadors.pom100.com',
    status: 'Live'
  },
  {
    id: '2',
    name: 'FluxFlow',
    description: 'A real-time data visualization dashboard for complex IoT networks.',
    tags: ['React', 'D3.js', 'WebSockets'],
    image: 'https://picsum.photos/seed/flux/800/600',
    link: '#',
    status: 'Live'
  },
  {
    id: '3',
    name: 'EchoMind',
    description: 'AI-powered note-taking app that automatically categorizes and links your thoughts.',
    tags: ['Next.js', 'OpenAI', 'Tailwind'],
    image: 'https://picsum.photos/seed/echo/800/600',
    link: '#',
    status: 'Beta'
  },
  {
    id: '4',
    name: 'NovaPay',
    description: 'Next-generation crypto wallet with biometric security and instant swaps.',
    tags: ['React Native', 'Web3', 'Rust'],
    image: 'https://picsum.photos/seed/nova/800/600',
    link: '#',
    status: 'Concept'
  },
  {
    id: '5',
    name: 'ZenithUI',
    description: 'A comprehensive component library designed for high-performance enterprise apps.',
    tags: ['TypeScript', 'Storybook', 'CSS-in-JS'],
    image: 'https://picsum.photos/seed/zenith/800/600',
    link: '#',
    status: 'Live'
  }
];
