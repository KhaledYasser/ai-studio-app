/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Game Page Route Component
 * Handles dynamic routing for all game pages
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import GamePage from '../components/GamePage';
import Footer from '../components/Footer';
import { GAMES, getRelatedGames } from '../data/games';

type Page = 'home' | 'articles' | 'gallery' | 'game';

export default function GamePageRoute() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, [gameId]);

  // Validate game exists
  if (!gameId || !GAMES[gameId]) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header onNavigate={(page: Page) => {
          if (page === 'home') navigate('/');
        }} currentPage="game" />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Game Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sorry, the game you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            >
              Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const game = GAMES[gameId];
  const gameWithRelated = {
    ...game,
    relatedGames: getRelatedGames(gameId)
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={(page: Page) => {
        if (page === 'home') navigate('/');
      }} currentPage="game" />
      <main className="flex-grow">
        <GamePage game={gameWithRelated} />
      </main>
      <div className="max-w-6xl mx-auto w-full px-4 md:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
        >
          ← Back to Home
        </button>
      </div>
      <Footer />
    </div>
  );
}
