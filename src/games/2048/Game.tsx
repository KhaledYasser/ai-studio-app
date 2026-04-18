import React, { useState, useEffect, useCallback } from 'react';

type Grid = number[][];

const GRID_SIZE = 4;

const Game2048: React.FC = () => {
  const [grid, setGrid] = useState<Grid>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const initGame = useCallback(() => {
    let newGrid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
    newGrid = addRandomTile(newGrid);
    newGrid = addRandomTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
    setWon(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const addRandomTile = (currentGrid: Grid): Grid => {
    const emptyCells = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (currentGrid[r][c] === 0) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length === 0) return currentGrid;
    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newGrid = currentGrid.map(row => [...row]);
    newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
    return newGrid;
  };

  const move = useCallback((direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    if (gameOver) return;

    setGrid(prevGrid => {
      let currentGrid = prevGrid.map(row => [...row]);
      let moved = false;
      let newScore = score;

      const rotate = (g: Grid) => g[0].map((_, i) => g.map(row => row[i]).reverse());
      
      // Normalize to LEFT move
      let rotations = 0;
      if (direction === 'UP') rotations = 1;
      else if (direction === 'RIGHT') rotations = 2;
      else if (direction === 'DOWN') rotations = 3;

      for (let i = 0; i < rotations; i++) currentGrid = rotate(currentGrid);

      // Perform LEFT move
      for (let r = 0; r < GRID_SIZE; r++) {
        let row = currentGrid[r].filter(val => val !== 0);
        for (let i = 0; i < row.length - 1; i++) {
          if (row[i] === row[i + 1]) {
            row[i] *= 2;
            newScore += row[i];
            if (row[i] === 2048) setWon(true);
            row.splice(i + 1, 1);
            moved = true;
          }
        }
        while (row.length < GRID_SIZE) row.push(0);
        if (JSON.stringify(currentGrid[r]) !== JSON.stringify(row)) moved = true;
        currentGrid[r] = row;
      }

      // Rotate back
      for (let i = 0; i < (4 - rotations) % 4; i++) currentGrid = rotate(currentGrid);

      if (moved) {
        setScore(newScore);
        const gridWithNewTile = addRandomTile(currentGrid);
        if (isGameOver(gridWithNewTile)) setGameOver(true);
        return gridWithNewTile;
      }
      return prevGrid;
    });
  }, [gameOver, score]);

  const isGameOver = (g: Grid): boolean => {
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (g[r][c] === 0) return false;
        if (c < GRID_SIZE - 1 && g[r][c] === g[r][c + 1]) return false;
        if (r < GRID_SIZE - 1 && g[r][c] === g[r + 1][c]) return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') move('LEFT');
      else if (e.key === 'ArrowRight') move('RIGHT');
      else if (e.key === 'ArrowUp') move('UP');
      else if (e.key === 'ArrowDown') move('DOWN');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  const getTileColor = (val: number) => {
    const colors: Record<number, string> = {
      2: 'bg-gray-200 text-gray-800',
      4: 'bg-gray-100 text-gray-800',
      8: 'bg-orange-200 text-white',
      16: 'bg-orange-300 text-white',
      32: 'bg-orange-400 text-white',
      64: 'bg-orange-500 text-white',
      128: 'bg-yellow-200 text-white text-2xl',
      256: 'bg-yellow-300 text-white text-2xl',
      512: 'bg-yellow-400 text-white text-2xl',
      1024: 'bg-yellow-500 text-white text-xl',
      2048: 'bg-yellow-600 text-white text-xl',
    };
    return colors[val] || 'bg-gray-700 text-white';
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#bbada0] p-4 rounded-xl">
      <div className="flex justify-between w-full max-w-[400px] mb-6 items-center">
        <h1 className="text-5xl font-bold text-[#776e65]">2048</h1>
        <div className="flex gap-2">
          <div className="bg-[#bbada0] p-3 rounded-lg min-w-[80px] text-center border-4 border-[#ccc0b3]">
            <div className="text-[#eee4da] text-xs font-bold uppercase">Score</div>
            <div className="text-white text-2xl font-bold">{score}</div>
          </div>
        </div>
      </div>

      <div className="relative bg-[#bbada0] p-4 rounded-xl shadow-inner border-8 border-[#bbada0]">
        <div className="grid grid-cols-4 gap-4 bg-[#cdc1b4] p-4 rounded-lg">
          {grid.map((row, r) => (
            row.map((val, c) => (
              <div
                key={`${r}-${c}`}
                className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg font-bold text-3xl transition-all duration-100 ${
                  val === 0 ? 'bg-[#eee4da] opacity-35' : getTileColor(val)
                }`}
              >
                {val !== 0 ? val : ''}
              </div>
            ))
          ))}
        </div>

        {(gameOver || won) && (
          <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-[#776e65] mb-4">
              {won ? 'You Win!' : 'Game Over!'}
            </h2>
            <button
              onClick={initGame}
              className="px-8 py-3 bg-[#8f7a66] hover:bg-[#7f6a56] text-white font-bold rounded-lg transition"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 text-[#776e65] text-center">
        <p className="font-bold">How to play:</p>
        <p>Use your <span className="bg-[#cdc1b4] px-2 py-1 rounded">arrow keys</span> to move the tiles.</p>
        <p>Tiles with the same number merge into one when they touch!</p>
      </div>
    </div>
  );
};

export default Game2048;
