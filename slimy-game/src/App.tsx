import { useEffect, useRef, useState } from 'react';
import './App.css';

interface Player {
  x: number;
  y: number;
  radius: number;
  color: string;
  isAI: boolean;
}

interface Ball {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
}

interface GameState {
  playerScore: number;
  aiScore: number;
  gameActive: boolean;
  gameStarted: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;
const PLAYER_RADIUS = 20;
const BALL_RADIUS = 8;
const GOAL_WIDTH = 150;
const GOAL_HEIGHT = 150;

// Colors: Red (#DC143C) and Cyan (#00CED1) - REVERSED from original
const PLAYER_COLOR = '#DC143C'; // Red (was originally Cyan)
const AI_COLOR = '#00CED1';      // Cyan (was originally Red)
const BALL_COLOR = '#FFD700';    // Gold
const BG_COLOR = '#0a0a0a';      // Dark background
const GOAL_COLOR = '#333333';    // Dark goal areas
const LINE_COLOR = '#444444';    // Field lines

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    playerScore: 0,
    aiScore: 0,
    gameActive: false,
    gameStarted: false,
    difficulty: 'medium',
  });

  const gameRef = useRef({
    player: { x: 100, y: CANVAS_HEIGHT / 2, radius: PLAYER_RADIUS, color: PLAYER_COLOR, isAI: false },
    ai: { x: CANVAS_WIDTH - 100, y: CANVAS_HEIGHT / 2, radius: PLAYER_RADIUS, color: AI_COLOR, isAI: true },
    ball: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, radius: BALL_RADIUS, vx: 0, vy: 0, color: BALL_COLOR },
    keys: { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false },
    playerScore: 0,
    aiScore: 0,
    gameActive: false,
  });

  const resetBall = () => {
    gameRef.current.ball = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      radius: BALL_RADIUS,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      color: BALL_COLOR,
    };
  };

  const startGame = (difficulty: 'easy' | 'medium' | 'hard') => {
    setGameState((prev) => ({
      ...prev,
      gameStarted: true,
      gameActive: true,
      difficulty,
      playerScore: 0,
      aiScore: 0,
    }));
    gameRef.current.playerScore = 0;
    gameRef.current.aiScore = 0;
    gameRef.current.gameActive = true;
    resetBall();
  };

  const resetGame = () => {
    setGameState((prev) => ({
      ...prev,
      gameStarted: false,
      gameActive: false,
      playerScore: 0,
      aiScore: 0,
    }));
    gameRef.current.gameActive = false;
    resetBall();
  };

  // Input handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        gameRef.current.keys[e.key as keyof typeof gameRef.current.keys] = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        gameRef.current.keys[e.key as keyof typeof gameRef.current.keys] = false;
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Main game loop
  useEffect(() => {
    if (!canvasRef.current || !gameState.gameActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const update = () => {
      const { player, ai, ball, keys } = gameRef.current;

      // Player movement with arrow keys
      if (keys.ArrowUp) player.y = Math.max(PLAYER_RADIUS, player.y - 5);
      if (keys.ArrowDown) player.y = Math.min(CANVAS_HEIGHT - PLAYER_RADIUS, player.y + 5);
      if (keys.ArrowLeft) player.x = Math.max(PLAYER_RADIUS, player.x - 5);
      if (keys.ArrowRight) player.x = Math.min(CANVAS_WIDTH / 2, player.x + 5);

      // AI movement (difficulty-based) - 2D movement!
      const aiSpeed = gameState.difficulty === 'easy' ? 2 : gameState.difficulty === 'medium' ? 3.5 : 5;
      const aiReactionDistance = gameState.difficulty === 'easy' ? 250 : gameState.difficulty === 'medium' ? 350 : 500;

      if (Math.abs(ball.x - ai.x) < aiReactionDistance) {
        // Chase ball in BOTH X and Y when close
        if (ball.y < ai.y - PLAYER_RADIUS) ai.y = Math.max(PLAYER_RADIUS, ai.y - aiSpeed);
        if (ball.y > ai.y + PLAYER_RADIUS) ai.y = Math.min(CANVAS_HEIGHT - PLAYER_RADIUS, ai.y + aiSpeed);
        
        // Also move in X to intercept! (2D tracking)
        if (ball.x < ai.x - 20) ai.x = Math.max(CANVAS_WIDTH / 2, ai.x - aiSpeed * 0.7);
        if (ball.x > ai.x + 20) ai.x = Math.min(CANVAS_WIDTH - PLAYER_RADIUS, ai.x + aiSpeed * 0.7);
      } else {
        // Return to center when ball is far
        if (ai.y < CANVAS_HEIGHT / 2 - 10) ai.y += aiSpeed * 0.5;
        if (ai.y > CANVAS_HEIGHT / 2 + 10) ai.y -= aiSpeed * 0.5;
        if (ai.x < CANVAS_WIDTH - 150) ai.x = Math.min(CANVAS_WIDTH - PLAYER_RADIUS, ai.x + aiSpeed * 0.3);
        if (ai.x > CANVAS_WIDTH - 50) ai.x = Math.max(CANVAS_WIDTH / 2, ai.x - aiSpeed * 0.3);
      }

      // Ball physics (TOP-DOWN TABLE - no gravity)
      ball.x += ball.vx;
      ball.y += ball.vy;
      // Apply friction to both X and Y velocities (horizontal sliding on table, NO GRAVITY)
      ball.vx *= 0.995;
      ball.vy *= 0.99;  // Friction only, NO vy += 0.3 gravity line

      // Wall collisions
      if (ball.y - ball.radius < 0 || ball.y + ball.radius > CANVAS_HEIGHT) {
        ball.vy *= -0.8;
        ball.y = Math.max(ball.radius, Math.min(CANVAS_HEIGHT - ball.radius, ball.y));
      }

      if (ball.x - ball.radius < 0) {
        // Player goal area
        if (ball.y > CANVAS_HEIGHT / 2 - GOAL_HEIGHT / 2 && ball.y < CANVAS_HEIGHT / 2 + GOAL_HEIGHT / 2) {
          gameRef.current.aiScore++;
          setGameState((prev) => ({ ...prev, aiScore: gameRef.current.aiScore }));
          resetBall();
        } else {
          ball.vx *= -0.9;
          ball.x = ball.radius;
        }
      }

      if (ball.x + ball.radius > CANVAS_WIDTH) {
        // AI goal area
        if (ball.y > CANVAS_HEIGHT / 2 - GOAL_HEIGHT / 2 && ball.y < CANVAS_HEIGHT / 2 + GOAL_HEIGHT / 2) {
          gameRef.current.playerScore++;
          setGameState((prev) => ({ ...prev, playerScore: gameRef.current.playerScore }));
          resetBall();
        } else {
          ball.vx *= -0.9;
          ball.x = CANVAS_WIDTH - ball.radius;
        }
      }

      // Player-ball collision
      const dist1 = Math.hypot(player.x - ball.x, player.y - ball.y);
      if (dist1 < PLAYER_RADIUS + BALL_RADIUS) {
        const angle = Math.atan2(ball.y - player.y, ball.x - player.x);
        ball.vx = Math.cos(angle) * 10;
        ball.vy = Math.sin(angle) * 10;
        ball.x = player.x + Math.cos(angle) * (PLAYER_RADIUS + BALL_RADIUS);
        ball.y = player.y + Math.sin(angle) * (PLAYER_RADIUS + BALL_RADIUS);
      }

      // AI-ball collision
      const dist2 = Math.hypot(ai.x - ball.x, ai.y - ball.y);
      if (dist2 < PLAYER_RADIUS + BALL_RADIUS) {
        const angle = Math.atan2(ball.y - ai.y, ball.x - ai.x);
        ball.vx = Math.cos(angle) * 10;
        ball.vy = Math.sin(angle) * 10;
        ball.x = ai.x + Math.cos(angle) * (PLAYER_RADIUS + BALL_RADIUS);
        ball.y = ai.y + Math.sin(angle) * (PLAYER_RADIUS + BALL_RADIUS);
      }

      render();
      animationId = requestAnimationFrame(update);
    };

    const render = () => {
      const { player, ai, ball } = gameRef.current;

      // Clear canvas
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw field lines
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(CANVAS_WIDTH / 2, 0);
      ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw circles at midfield
      ctx.strokeStyle = LINE_COLOR;
      ctx.beginPath();
      ctx.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 50, 0, Math.PI * 2);
      ctx.stroke();

      // Draw goals
      ctx.fillStyle = GOAL_COLOR;
      ctx.fillRect(0, CANVAS_HEIGHT / 2 - GOAL_HEIGHT / 2, 20, GOAL_HEIGHT);
      ctx.fillRect(CANVAS_WIDTH - 20, CANVAS_HEIGHT / 2 - GOAL_HEIGHT / 2, 20, GOAL_HEIGHT);

      // Draw players
      ctx.fillStyle = player.color;
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = ai.color;
      ctx.beginPath();
      ctx.arc(ai.x, ai.y, ai.radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw ball
      ctx.fillStyle = ball.color;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    animationId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationId);
  }, [gameState.gameActive, gameState.difficulty]);

  return (
    <div className="app-container">
      <div className="game-wrapper">
        <div className="header">
          <h1>SLIMY SOCCER</h1>
          <div className="score-board">
            <div className="score player-score">
              <span className="label">YOU</span>
              <span className="score-value">{gameState.playerScore}</span>
            </div>
            <div className="score ai-score">
              <span className="label">AI</span>
              <span className="score-value">{gameState.aiScore}</span>
            </div>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="game-canvas"
        />

        <div className="controls-panel">
          {!gameState.gameStarted ? (
            <div className="mode-selection">
              <h2>SELECT DIFFICULTY</h2>
              <div className="difficulty-buttons">
                <button onClick={() => startGame('easy')} className="btn btn-easy">
                  🟢 EASY
                </button>
                <button onClick={() => startGame('medium')} className="btn btn-medium">
                  🟡 MEDIUM
                </button>
                <button onClick={() => startGame('hard')} className="btn btn-hard">
                  🔴 HARD
                </button>
              </div>
              <div className="instructions">
                <h3>HOW TO PLAY</h3>
                <p>🎮 Use <strong>Arrow Keys</strong> to move</p>
                <p>⚽ Push the ball into the AI's goal</p>
                <p>🏆 First to 5 goals wins!</p>
              </div>
            </div>
          ) : (
            <div className="game-controls">
              <div className="controls-hint">
                <p>↑ ↓ ← → to move | Push ball to score!</p>
              </div>
              <button onClick={resetGame} className="btn btn-reset">
                ↻ NEW GAME
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
