import React, { useEffect, useRef, useState, useCallback } from 'react';

const ROWS = 20;
const COLS = 10;
const INITIAL_DROP_INTERVAL = 800;

const PIECES = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[0, 1, 0], [1, 1, 1]], // T
  [[1, 0, 0], [1, 1, 1]], // L
  [[0, 0, 1], [1, 1, 1]], // J
  [[0, 1, 1], [1, 1, 0]], // S
  [[1, 1, 0], [0, 1, 1]], // Z
];

const COLORS = [
  '#00f0f0', // cyan
  '#ffff00', // yellow
  '#a000f0', // purple
  '#f0a000', // orange
  '#0000f0', // blue
  '#00f000', // green
  '#f00000', // red
];

interface Piece {
  shape: number[][];
  color: string;
  x: number;
  y: number;
}

const TetrisGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [board, setBoard] = useState<(string | null)[][]>(
    Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextPiece, setNextPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const getRandomPiece = useCallback((): Piece => {
    const index = Math.floor(Math.random() * PIECES.length);
    return {
      shape: PIECES[index],
      color: COLORS[index],
      x: Math.floor(COLS / 2) - Math.floor(PIECES[index][0].length / 2),
      y: 0,
    };
  }, []);

  const resetGame = useCallback(() => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    setCurrentPiece(getRandomPiece());
    setNextPiece(getRandomPiece());
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOver(false);
    setIsPaused(false);
  }, [getRandomPiece]);

  useEffect(() => {
    if (!currentPiece && !gameOver) {
      setCurrentPiece(getRandomPiece());
      setNextPiece(getRandomPiece());
    }
  }, [currentPiece, gameOver, getRandomPiece]);

  const isValidMove = useCallback(
    (shape: number[][], x: number, y: number, currentBoard: (string | null)[][]) => {
      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col]) {
            const newX = x + col;
            const newY = y + row;
            if (
              newX < 0 ||
              newX >= COLS ||
              newY >= ROWS ||
              (newY >= 0 && currentBoard[newY][newX])
            ) {
              return false;
            }
          }
        }
      }
      return true;
    },
    []
  );

  const rotatePiece = useCallback(() => {
    if (!currentPiece || isPaused || gameOver) return;

    const shape = currentPiece.shape;
    const rotated = shape[0].map((_, i) => shape.map((row) => row[i]).reverse());

    if (isValidMove(rotated, currentPiece.x, currentPiece.y, board)) {
      setCurrentPiece({ ...currentPiece, shape: rotated });
    }
  }, [currentPiece, board, isPaused, gameOver, isValidMove]);

  const movePiece = useCallback(
    (dx: number, dy: number) => {
      if (!currentPiece || isPaused || gameOver) return false;

      if (isValidMove(currentPiece.shape, currentPiece.x + dx, currentPiece.y + dy, board)) {
        setCurrentPiece({ ...currentPiece, x: currentPiece.x + dx, y: currentPiece.y + dy });
        return true;
      }

      if (dy > 0) {
        // Lock piece
        const newBoard = board.map((row) => [...row]);
        currentPiece.shape.forEach((row, i) => {
          row.forEach((value, j) => {
            if (value) {
              const boardY = currentPiece.y + i;
              const boardX = currentPiece.x + j;
              if (boardY >= 0) {
                newBoard[boardY][boardX] = currentPiece.color;
              }
            }
          });
        });

        // Clear lines
        let clearedLines = 0;
        const filteredBoard = newBoard.filter((row) => row.some((cell) => cell === null));
        clearedLines = ROWS - filteredBoard.length;
        while (filteredBoard.length < ROWS) {
          filteredBoard.unshift(Array(COLS).fill(null));
        }

        if (clearedLines > 0) {
          const points = [0, 100, 300, 500, 800][clearedLines] * level;
          setScore((s) => s + points);
          setLines((l) => {
            const newLines = l + clearedLines;
            setLevel(Math.floor(newLines / 10) + 1);
            return newLines;
          });
        }

        setBoard(filteredBoard);

        if (!isValidMove(nextPiece!.shape, nextPiece!.x, nextPiece!.y, filteredBoard)) {
          setGameOver(true);
        } else {
          setCurrentPiece(nextPiece);
          setNextPiece(getRandomPiece());
        }
      }
      return false;
    },
    [currentPiece, board, isPaused, gameOver, nextPiece, level, getRandomPiece, isValidMove]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) {
        if (e.key === 'r' || e.key === 'R') resetGame();
        return;
      }
      if (e.key === 'p' || e.key === 'P') setIsPaused((prev) => !prev);
      if (isPaused) return;

      switch (e.key) {
        case 'ArrowLeft':
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          movePiece(0, 1);
          break;
        case 'ArrowUp':
          rotatePiece();
          break;
        case ' ':
          // Hard drop
          let tempY = currentPiece?.y || 0;
          while (currentPiece && isValidMove(currentPiece.shape, currentPiece.x, tempY + 1, board)) {
            tempY++;
          }
          if (currentPiece) {
            setCurrentPiece({ ...currentPiece, y: tempY });
            // The next tick will lock it
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPiece, board, isPaused, gameOver, movePiece, rotatePiece, resetGame, isValidMove]);

  useEffect(() => {
    if (isPaused || gameOver) return;
    const interval = Math.max(100, INITIAL_DROP_INTERVAL - (level - 1) * 100);
    const dropTimer = setInterval(() => {
      movePiece(0, 1);
    }, interval);
    return () => clearInterval(dropTimer);
  }, [isPaused, gameOver, level, movePiece]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const blockSize = canvas.width / COLS;

    // Draw board
    ctx.fillStyle = '#0f172a'; // slate-900
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#334155'; // slate-700
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= COLS; i++) {
      ctx.beginPath();
      ctx.moveTo(i * blockSize, 0);
      ctx.lineTo(i * blockSize, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i <= ROWS; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * blockSize);
      ctx.lineTo(canvas.width, i * blockSize);
      ctx.stroke();
    }

    // Draw locked blocks
    board.forEach((row, y) => {
      row.forEach((color, x) => {
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(x * blockSize + 1, y * blockSize + 1, blockSize - 2, blockSize - 2);
          // Add highlight
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.fillRect(x * blockSize + 1, y * blockSize + 1, blockSize - 2, 4);
        }
      });
    });

    // Draw current piece
    if (currentPiece) {
      ctx.fillStyle = currentPiece.color;
      currentPiece.shape.forEach((row, i) => {
        row.forEach((value, j) => {
          if (value) {
            const x = currentPiece.x + j;
            const y = currentPiece.y + i;
            if (y >= 0) {
              ctx.fillRect(x * blockSize + 1, y * blockSize + 1, blockSize - 2, blockSize - 2);
              ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
              ctx.fillRect(x * blockSize + 1, y * blockSize + 1, blockSize - 2, 4);
              ctx.fillStyle = currentPiece.color;
            }
          }
        });
      });
    }

    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
      ctx.font = '20px sans-serif';
      ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
      ctx.fillText('Press R to Restart', canvas.width / 2, canvas.height / 2 + 60);
    } else if (isPaused) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
      ctx.font = '20px sans-serif';
      ctx.fillText('Press P or Start to Play', canvas.width / 2, canvas.height / 2 + 40);
    }
  }, [board, currentPiece, gameOver, isPaused, score]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-full bg-slate-950 text-white p-4 gap-8">
      <div className="flex flex-col gap-6 order-2 md:order-1">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Score</div>
          <div className="text-3xl font-mono text-cyan-400">{score.toString().padStart(6, '0')}</div>
        </div>
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Level</div>
          <div className="text-3xl font-mono text-purple-400">{level}</div>
        </div>
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Lines</div>
          <div className="text-3xl font-mono text-emerald-400">{lines}</div>
        </div>
      </div>

      <div className="relative order-1 md:order-2">
        <canvas
          ref={canvasRef}
          width={300}
          height={600}
          className="bg-slate-900 rounded-lg shadow-2xl border-4 border-slate-800 max-h-[80vh] w-auto"
        />
      </div>

      <div className="flex flex-col gap-6 order-3">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">Next</div>
          <div className="w-24 h-24 flex items-center justify-center bg-slate-950 rounded-lg">
            {nextPiece && (
              <div className="grid gap-1" style={{ 
                gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, minmax(0, 1fr))` 
              }}>
                {nextPiece.shape.flat().map((val, i) => (
                  <div key={i} className={`w-4 h-4 rounded-sm ${val ? '' : 'invisible'}`} 
                       style={{ backgroundColor: nextPiece.color }} />
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              if (gameOver) resetGame();
              else setIsPaused(prev => !prev);
            }}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition shadow-lg"
          >
            {gameOver ? 'Restart' : isPaused ? 'Start' : 'Pause'}
          </button>
        </div>
        
        <div className="text-xs text-slate-500 max-w-[150px]">
          Arrows to Move & Rotate<br/>
          Space for Hard Drop<br/>
          P to Pause
        </div>
      </div>
    </div>
  );
};

export default TetrisGame;
