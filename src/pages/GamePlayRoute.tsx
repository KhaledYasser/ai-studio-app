import React, { useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GAME_COMPONENTS } from "../games";
import Header from "../components/Header";
import { GamePageProps } from "../types";

type Page = "home" | "articles" | "gallery" | "game";

const GamePlayRoute: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  const gameComponent = gameId ? GAME_COMPONENTS[gameId] : null;

  // ESC to exit fullscreen game
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(-1); // Back to game details
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [navigate]);

  if (!gameId || !gameComponent) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Game Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Minimal Game Header */}
      <header className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-md border-b border-white/20 z-50">
        <button
          onClick={() => navigate(`/games/${gameId}`)}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
        >
          <span className="text-xl">←</span>
          <span className="font-semibold">Exit Game</span>
        </button>

        <div className="text-right text-white/80">
          <div className="text-sm font-mono uppercase tracking-wider">
            ESC to Exit
          </div>
          <div className="text-xs">WASD to Play</div>
        </div>
      </header>

      {/* Fullscreen Game */}

      {/* Game Instructions Overlay */}
      <div className="p-6 bg-gradient-to-t from-black/80 to-transparent text-center text-white/90 text-sm max-w-2xl mx-auto">
        <div className="uppercase font-bold tracking-wider mb-2 text-brand-400">
          Controls
        </div>
        <div>WASD: Move | ESC: Exit | R: Restart (some games)</div>
      </div>
    </div>
  );
};

export default GamePlayRoute;
