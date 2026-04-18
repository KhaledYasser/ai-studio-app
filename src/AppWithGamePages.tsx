/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * This is the updated App with Game Pages routing support
 * To integrate: Replace the import statements in App.tsx or use this as reference
 */

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Articles from './components/Articles';
import AppGallery from './components/AppGallery';
import ArticlesPage from './components/ArticlesPage';
import AppGalleryPage from './components/AppGalleryPage';
import GamePage from './components/GamePage';
import Footer from './components/Footer';
import { GAMES, getRelatedGames } from './data/games';

type Page = 'home' | 'articles' | 'gallery' | 'game';

interface AppState {
  currentPage: Page;
  selectedGameId?: string;
}

export default function App() {
  const [state, setState] = useState<AppState>({ currentPage: 'home' });

  const navigate = (page: Page, gameId?: string) => {
    setState({ currentPage: page, selectedGameId: gameId });
    window.scrollTo(0, 0);
  };

  const navigateToGame = (gameId: string) => {
    const game = GAMES[gameId];
    if (game) {
      const gameWithRelated = {
        ...game,
        relatedGames: getRelatedGames(gameId)
      };
      navigate('game', gameId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={navigate} currentPage={state.currentPage} />
      <main className="flex-grow">
        {state.currentPage === 'home' && (
          <>
            <Hero onNavigate={navigate} />
            <Articles onViewAll={() => navigate('articles')} />
            <AppGallery onViewAll={() => navigate('gallery')} />
          </>
        )}
        {state.currentPage === 'articles' && <ArticlesPage onBack={() => navigate('home')} />}
        {state.currentPage === 'gallery' && <AppGalleryPage onBack={() => navigate('home')} />}
        {state.currentPage === 'game' && state.selectedGameId && (
          <div className="flex flex-col">
            <GamePage game={{
              ...GAMES[state.selectedGameId],
              relatedGames: getRelatedGames(state.selectedGameId)
            }} />
            <div className="max-w-6xl mx-auto w-full px-4 md:px-8 py-4">
              <button
                onClick={() => navigate('home')}
                className="px-6 py-2 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
