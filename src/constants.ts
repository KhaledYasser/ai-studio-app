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
    link: 'https://invadors.pom100.com',
    status: 'Live'
  },
  {
    id: '2',
    name: '2048',
    description: 'Addictive puzzle game where you combine tiles to reach 2048. Simple rules, endless challenge.',
    tags: ['React', 'Puzzle', 'Game Dev'],
    image: 'https://picsum.photos/seed/game/800/600',
    link: 'https://2048.pom100.com',
    status: 'Live'
  },
  {
    id: '3',
    name: 'Flappy Bird',
    description: 'Classic side-scrolling action game. Navigate through pipes and beat your high score.',
    tags: ['React', 'Canvas', 'Game Dev'],
    image: 'https://picsum.photos/seed/bird/800/600',
    link: 'https://flappy.pom100.com',
    status: 'Live'
  },
  {
    id: '4',
    name: 'Snake',
    description: 'Timeless snake game. Eat food, grow longer, and avoid hitting yourself or walls.',
    tags: ['React', 'Retro', 'Game Dev'],
    image: 'https://picsum.photos/seed/snake/800/600',
    link: 'https://snake.pom100.com',
    status: 'Live'
  },
  {
    id: '5',
    name: 'Tetris',
    description: 'Stack the falling blocks to clear lines and achieve the highest score possible.',
    tags: ['React', 'Puzzle', 'Game Dev'],
    image: 'https://picsum.photos/seed/blocks/800/600',
    link: 'https://tetris.pom100.com',
    status: 'Live'
  },
  {
    id: '6',
    name: 'FluxFlow',
    description: 'A real-time data visualization dashboard for complex IoT networks.',
    tags: ['React', 'D3.js', 'WebSockets'],
    image: 'https://picsum.photos/seed/flux/800/600',
    link: '#',
    status: 'Live'
  },
  {
    id: '7',
    name: 'EchoMind',
    description: 'AI-powered note-taking app that automatically categorizes and links your thoughts.',
    tags: ['Next.js', 'OpenAI', 'Tailwind'],
    image: 'https://picsum.photos/seed/echo/800/600',
    link: '#',
    status: 'Beta'
  },
  {
    id: '8',
    name: 'NovaPay',
    description: 'Next-generation crypto wallet with biometric security and instant swaps.',
    tags: ['React Native', 'Web3', 'Rust'],
    image: 'https://picsum.photos/seed/nova/800/600',
    link: '#',
    status: 'Concept'
  },
  {
    id: '9',
    name: 'ZenithUI',
    description: 'A comprehensive component library designed for high-performance enterprise apps.',
    tags: ['TypeScript', 'Storybook', 'CSS-in-JS'],
    image: 'https://picsum.photos/seed/zenith/800/600',
    link: '#',
    status: 'Live'
  }
];
