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
  },
  {
    id: 'article-001',
    title: 'DeepSeek R1 Challenges OpenAI Dominance: The New Era of Open-Source AI',
    excerpt: 'DeepSeek\'s latest reasoning model rivals GPT-4 performance while remaining open-source, reshaping the competitive AI landscape and democratizing advanced AI access.',
    category: 'AI & ML',
    date: '2025-03-15',
    readTime: '6 min',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://picsum.photos/seed/sarah-chen/200'
    },
    image: 'https://picsum.photos/seed/deepseek-r1/800/400',
    tags: ['AI/ML', 'open-source', 'reasoning models', 'DeepSeek', 'machine learning']
  },
  {
    id: 'article-002',
    title: 'Next.js 15 Transforms Full-Stack Development: What Developers Need to Know',
    excerpt: 'Next.js 15 introduces Server Components by default, enhanced caching strategies, and unified deployment—streamlining full-stack development workflows for modern teams.',
    category: 'Web Development',
    date: '2025-02-28',
    readTime: '7 min',
    author: {
      name: 'Marcus Rodriguez',
      avatar: 'https://picsum.photos/seed/marcus-rodriguez/200'
    },
    image: 'https://picsum.photos/seed/nextjs-15/800/400',
    tags: ['Next.js', 'React', 'full-stack', 'server components', 'web development']
  },
  {
    id: 'article-003',
    title: 'Ray Tracing Goes Mainstream: Real-Time Graphics Revolution in 2025',
    excerpt: 'NVIDIA\'s latest GPU architecture democratizes ray tracing technology, enabling indie game developers to deliver photorealistic visuals without AAA budgets.',
    category: 'Gaming Technology',
    date: '2025-01-22',
    readTime: '5 min',
    author: {
      name: 'Alex Thompson',
      avatar: 'https://picsum.photos/seed/alex-thompson/200'
    },
    image: 'https://picsum.photos/seed/ray-tracing/800/400',
    tags: ['gaming', 'ray tracing', 'graphics', 'GPU technology', 'game development']
  },
  {
    id: 'article-004',
    title: 'Svelte 5 Redefines Reactivity: The Zero-Overhead Framework Comes of Age',
    excerpt: 'Svelte 5 introduces rune-based reactivity that eliminates hidden compiled code, delivering frameworks with better developer ergonomics and superior runtime performance.',
    category: 'Frontend Frameworks',
    date: '2025-03-10',
    readTime: '7 min',
    author: {
      name: 'Jamie Lee',
      avatar: 'https://picsum.photos/seed/jamie-lee/200'
    },
    image: 'https://picsum.photos/seed/svelte-5/800/400',
    tags: ['Svelte', 'frontend', 'JavaScript', 'reactivity', 'performance']
  },
  {
    id: 'article-005',
    title: 'Kubernetes Edge: Bringing Container Orchestration to the Network\'s Edge',
    excerpt: 'New edge-optimized Kubernetes distributions enable real-time processing and reduced latency at the network edge, transforming IoT and edge computing architectures.',
    category: 'Cloud Computing',
    date: '2025-02-15',
    readTime: '6 min',
    author: {
      name: 'Dr. Priya Kapoor',
      avatar: 'https://picsum.photos/seed/priya-kapoor/200'
    },
    image: 'https://picsum.photos/seed/kubernetes-edge/800/400',
    tags: ['Kubernetes', 'edge computing', 'containers', 'IoT', 'cloud architecture']
  },
  {
    id: 'article-006',
    title: 'AI-Powered Developer Tools Reshape Coding: Beyond Autocomplete',
    excerpt: '2025\'s AI developer tools have evolved from simple autocomplete to full architectural partners, understanding project context and generating production-ready code.',
    category: 'Developer Tools',
    date: '2025-03-05',
    readTime: '7 min',
    author: {
      name: 'Michael Chen',
      avatar: 'https://picsum.photos/seed/michael-chen/200'
    },
    image: 'https://picsum.photos/seed/ai-dev-tools/800/400',
    tags: ['AI/ML', 'developer tools', 'productivity', 'code generation', 'GitHub Copilot']
  },
  {
    id: 'article-007',
    title: 'Rust Ecosystem Explosion: Systems Programming\'s New Standard',
    excerpt: 'Rust adoption among system software projects accelerated dramatically in 2025, with Linux kernel integration and critical infrastructure rewritten in Rust.',
    category: 'Open Source',
    date: '2025-01-30',
    readTime: '6 min',
    author: {
      name: 'Elena Volkova',
      avatar: 'https://picsum.photos/seed/elena-volkova/200'
    },
    image: 'https://picsum.photos/seed/rust-ecosystem/800/400',
    tags: ['Rust', 'systems programming', 'open source', 'Linux kernel', 'safety']
  },
  {
    id: 'article-008',
    title: 'WebAssembly Goes Mainstream: Browser Boundaries Blur in 2025',
    excerpt: 'WebAssembly adoption hit critical mass in 2025, enabling desktop-grade applications in browsers and fundamentally changing client-side application architecture.',
    category: 'Web Development',
    date: '2025-02-22',
    readTime: '7 min',
    author: {
      name: 'James Wilson',
      avatar: 'https://picsum.photos/seed/james-wilson/200'
    },
    image: 'https://picsum.photos/seed/webassembly/800/400',
    tags: ['WebAssembly', 'browser', 'performance', 'web applications', 'WASM']
  },
  {
    id: 'article-009',
    title: 'Performance Obsession Drives Core Web Vitals Evolution',
    excerpt: 'Search engines and user expectations made performance non-negotiable in 2025. New metrics prioritize perceived responsiveness over raw speed.',
    category: 'Performance',
    date: '2025-03-08',
    readTime: '6 min',
    author: {
      name: 'David Kumar',
      avatar: 'https://picsum.photos/seed/david-kumar/200'
    },
    image: 'https://picsum.photos/seed/web-performance/800/400',
    tags: ['performance', 'web vitals', 'optimization', 'user experience', 'SEO']
  },
  {
    id: 'article-010',
    title: 'Polyfill Supply Chain Crisis Reshapes Frontend Security',
    excerpt: 'The 2024 polyfill attacks exposed fragile dependencies in JavaScript infrastructure. Organizations are rebuilding trust through transparent, vendor-managed security.',
    category: 'Security',
    date: '2025-01-15',
    readTime: '6 min',
    author: {
      name: 'Security Research Team',
      avatar: 'https://picsum.photos/seed/security-team/200'
    },
    image: 'https://picsum.photos/seed/supply-chain-security/800/400',
    tags: ['security', 'supply chain', 'JavaScript', 'polyfills', 'dependencies']
  },
  {
    id: 'article-011',
    title: 'DeepSeek R1 Challenges OpenAI Dominance: The New Era of Open-Source AI',
    excerpt: 'DeepSeek\'s latest reasoning model rivals GPT-4 performance while remaining open-source, reshaping the competitive AI landscape and democratizing advanced AI access.',
    category: 'AI & ML',
    date: '2025-03-15',
    readTime: '6 min',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://picsum.photos/seed/sarah-chen/200'
    },
    image: 'https://picsum.photos/seed/deepseek-r1/800/400',
    tags: ['AI/ML', 'open-source', 'reasoning models', 'DeepSeek']
  },
  {
    id: 'article-012',
    title: 'Next.js 15 Transforms Full-Stack Development: What Developers Need to Know',
    excerpt: 'Next.js 15 introduces Server Components by default, enhanced caching strategies, and unified deployment—streamlining full-stack development workflows for modern teams.',
    category: 'Web Development',
    date: '2025-02-28',
    readTime: '7 min',
    author: {
      name: 'Marcus Rodriguez',
      avatar: 'https://picsum.photos/seed/marcus-rodriguez/200'
    },
    image: 'https://picsum.photos/seed/nextjs-15/800/400',
    tags: ['Next.js', 'React', 'full-stack', 'server components']
  },
  {
    id: 'article-013',
    title: 'Ray Tracing Goes Mainstream: Real-Time Graphics Revolution in 2025',
    excerpt: 'NVIDIA\'s latest GPU architecture democratizes ray tracing technology, enabling indie game developers to deliver photorealistic visuals without AAA budgets.',
    category: 'Gaming Technology',
    date: '2025-01-22',
    readTime: '5 min',
    author: {
      name: 'Alex Thompson',
      avatar: 'https://picsum.photos/seed/alex-thompson/200'
    },
    image: 'https://picsum.photos/seed/ray-tracing/800/400',
    tags: ['gaming', 'ray tracing', 'graphics', 'GPU']
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
    name: 'Slimy',
    description: 'Slimy Soccer - Control your slime character and play soccer against an AI opponent. Simple controls, addictive gameplay.',
    tags: ['React', 'Sports', 'Game Dev'],
    image: 'https://picsum.photos/seed/slimy/800/600',
    link: 'https://slimy.pom100.com',
    status: 'Live'
  },
  {
    id: '7',
    name: 'FluxFlow',
    description: 'A real-time data visualization dashboard for complex IoT networks.',
    tags: ['React', 'D3.js', 'WebSockets'],
    image: 'https://picsum.photos/seed/flux/800/600',
    link: '#',
    status: 'Live'
  },
  {
    id: '8',
    name: 'EchoMind',
    description: 'AI-powered note-taking app that automatically categorizes and links your thoughts.',
    tags: ['Next.js', 'OpenAI', 'Tailwind'],
    image: 'https://picsum.photos/seed/echo/800/600',
    link: '#',
    status: 'Beta'
  },
  {
    id: '9',
    name: 'NovaPay',
    description: 'Next-generation crypto wallet with biometric security and instant swaps.',
    tags: ['React Native', 'Web3', 'Rust'],
    image: 'https://picsum.photos/seed/nova/800/600',
    link: '#',
    status: 'Concept'
  },
  {
    id: '10',
    name: 'ZenithUI',
    description: 'A comprehensive component library designed for high-performance enterprise apps.',
    tags: ['TypeScript', 'Storybook', 'CSS-in-JS'],
    image: 'https://picsum.photos/seed/zenith/800/600',
    link: '#',
    status: 'Live'
  },
  {
    id: '11',
    name: 'Career-Advisor',
    description: 'AI-powered career guidance dashboard. Evaluate opportunities with AI scoring on 10 key dimensions and get personalized career insights.',
    tags: ['AI/ML', 'Claude AI', 'Career Tools', 'React'],
    image: 'https://picsum.photos/seed/careeradvisor/800/600',
    link: 'https://career-advisor.pom100.com',
    status: 'Live'
  }
];
