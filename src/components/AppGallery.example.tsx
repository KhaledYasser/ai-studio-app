/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * EXAMPLE: Updated AppGallery Component with Game Pages Integration
 * 
 * This file shows how to modify your existing AppGallery component
 * to support clicking through to individual game pages.
 * 
 * Copy the relevant sections to update your AppGallery.tsx and AppGalleryPage.tsx
 */

import { useState } from 'react';
import { APPS } from '../constants';

interface AppGalleryProps {
  onViewAll?: () => void;
  onGameSelect?: (gameId: string) => void;  // NEW: callback for game page navigation
}

export default function AppGallery({ onViewAll, onGameSelect }: AppGalleryProps) {
  const [filter, setFilter] = useState<string>('all');

  // Map app IDs to game IDs for navigation
  // Update these to match your game IDs in games.ts
  const gameIdMap: Record<string, string> = {
    '1': 'invadors',
    '2': '2048',
    '3': 'flappy-bird',
    '4': 'snake',
    '5': 'tetris',
    '6': 'slimy'
  };

  const isGameCard = (appId: string): boolean => appId in gameIdMap;

  const handleCardClick = (app: typeof APPS[0]) => {
    // If it's a game, navigate to game page
    if (isGameCard(app.id) && onGameSelect) {
      const gameId = gameIdMap[app.id];
      onGameSelect(gameId);
    } else {
      // Otherwise, open external link
      window.open(app.link, '_blank');
    }
  };

  const apps = filter === 'all' ? APPS : APPS.filter(app => app.tags.includes(filter));

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Showcase & Projects
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        A collection of games and web applications built with modern technologies
      </p>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-12">
        {['all', 'Game Dev', 'React', 'TypeScript'].map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag === 'all' ? 'all' : tag)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filter === (tag === 'all' ? 'all' : tag)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {apps.map((app) => (
          <div
            key={app.id}
            className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
            onClick={() => handleCardClick(app)}
          >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
              <img
                src={app.image}
                alt={app.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                loading="lazy"
              />
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                    app.status === 'Live'
                      ? 'bg-green-500'
                      : app.status === 'Beta'
                      ? 'bg-yellow-500'
                      : 'bg-gray-500'
                  }`}
                >
                  {app.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                {app.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                {app.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {app.tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Game-specific indicator */}
              {isGameCard(app.id) && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                    🎮 View Game Page →
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      {onViewAll && (
        <button
          onClick={onViewAll}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          View All Projects
        </button>
      )}
    </section>
  );
}

/**
 * ============================================================================
 * UPDATED APP CONSTANTS - Include Game Page Images
 * ============================================================================
 * 
 * Replace your constants.ts APPS array with this version to use the
 * high-quality Unsplash images for games
 */

export const APPS_UPDATED = [
  {
    id: '1',
    name: 'Invadors',
    description: 'Classic Space Invaders game built with React. Test your reflexes and defend against endless waves of aliens.',
    tags: ['React', 'TypeScript', 'Game Dev'],
    image: 'https://images.unsplash.com/photo-1538481143235-e7ad196bcc86?w=1200&h=800&fit=crop',
    link: 'https://invadors.pom100.com',
    status: 'Live'
  },
  {
    id: '2',
    name: '2048',
    description: 'Addictive puzzle game where you combine tiles to reach 2048. Simple rules, endless challenge.',
    tags: ['React', 'Puzzle', 'Game Dev'],
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&h=800&fit=crop',
    link: 'https://2048.pom100.com',
    status: 'Live'
  },
  {
    id: '3',
    name: 'Flappy Bird',
    description: 'Classic side-scrolling action game. Navigate through pipes and beat your high score.',
    tags: ['React', 'Canvas', 'Game Dev'],
    image: 'https://images.unsplash.com/photo-1444464666175-1469f8c6dea0?w=1200&h=800&fit=crop',
    link: 'https://flappy.pom100.com',
    status: 'Live'
  },
  {
    id: '4',
    name: 'Snake',
    description: 'Timeless snake game. Eat food, grow longer, and avoid hitting yourself or walls.',
    tags: ['React', 'Retro', 'Game Dev'],
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1200&h=800&fit=crop',
    link: 'https://snake.pom100.com',
    status: 'Live'
  },
  {
    id: '5',
    name: 'Tetris',
    description: 'Stack the falling blocks to clear lines and achieve the highest score possible.',
    tags: ['React', 'Puzzle', 'Game Dev'],
    image: 'https://images.unsplash.com/photo-1579546929662-711aa33e3881?w=1200&h=800&fit=crop',
    link: 'https://tetris.pom100.com',
    status: 'Live'
  },
  {
    id: '6',
    name: 'Slimy',
    description: 'Slimy Soccer - Control your slime character and play soccer against an AI opponent. Simple controls, addictive gameplay.',
    tags: ['React', 'Sports', 'Game Dev'],
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=800&fit=crop',
    link: 'https://slimy.pom100.com',
    status: 'Live'
  },
  // ... rest of non-game projects remain the same
];

/**
 * ============================================================================
 * INTEGRATION CHECKLIST
 * ============================================================================
 * 
 * 1. [ ] Copy this component or merge the onGameSelect prop into AppGallery.tsx
 * 2. [ ] Update your constants.ts APPS array with APPS_UPDATED (above)
 * 3. [ ] Update AppGalleryPage.tsx with similar changes
 * 4. [ ] Add onGameSelect callback in App.tsx:
 *        onGameSelect={(gameId) => navigateToGame(gameId)}
 * 5. [ ] Import GAMES and getRelatedGames in App.tsx
 * 6. [ ] Test game card clicks - should navigate to game page
 * 7. [ ] Verify hero images load on game pages
 * 8. [ ] Test on mobile, tablet, and desktop
 */
