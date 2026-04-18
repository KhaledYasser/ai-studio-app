import React from 'react';
import { GAME_COMPONENTS } from '../games';

export function GameEmbed({ gameId }: { gameId: string }) {
  const GameComponent = GAME_COMPONENTS[gameId];

  if (!GameComponent) {
    return (
      <div className="flex items-center justify-center h-[400px] md:h-[600px] bg-gray-900 text-white rounded-xl border-4 border-gray-800 shadow-inner">
        <div className="text-center">
          <span className="text-4xl mb-4 block">🎮</span>
          <p className="text-xl font-semibold">Game Interface Not Found</p>
          <p className="text-gray-400 mt-2">ID: {gameId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] md:h-[650px] bg-black rounded-xl overflow-hidden shadow-2xl relative border-4 border-gray-800 dark:border-gray-700">
      <GameComponent />
    </div>
  );
}
