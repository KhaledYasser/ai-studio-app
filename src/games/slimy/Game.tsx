import React, { useEffect, useRef, useState, useCallback } from 'react';

interface GameObject {
  x: number;
  y: number;
  radius: number;
  color: string;
}

interface Ball extends GameObject {
  vx: number;
  vy: number;
}

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;
const PLAYER_RADIUS = 25;
const BALL_RADIUS = 12;
const GOAL_WIDTH = 150;
const GOAL_HEIGHT = 200;

const PLAYER_COLOR = '#00CED1'; // Cyan
const AI_COLOR = '#DC143C';     // Red
const BALL_COLOR = '#FFD700';   // Gold
const BG_COLOR = '#0f172a';     // Slate 900
const LINE_COLOR = '#334155';   // Slate 700

const SlimyGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scores, setScores] = useState({ player: 0, ai: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const gameRef = useRef({
    player: { x: 150, y: CANVAS_HEIGHT / 2, radius: PLAYER_RADIUS, color: PLAYER_COLOR },
    ai: { x: CANVAS_WIDTH - 150, y: CANVAS_HEIGHT / 2, radius: PLAYER_RADIUS, color: AI_COLOR },
    ball: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, radius: BALL_RADIUS, vx: 0, vy: 0, color: BALL_COLOR },
    keys: { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false },
    active: false
  });

  const resetBall = useCallback((scoringPlayer?: 'player' | 'ai') => {
    gameRef.current.ball = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      radius: BALL_RADIUS,
      vx: scoringPlayer === 'player' ? 5 : scoringPlayer === 'ai' ? -5 : (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      color: BALL_COLOR,
    };
  }, []);

  const startGame = (diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff);
    setScores({ player: 0, ai: 0 });
    setGameStarted(true);
    gameRef.current.active = true;
    resetBall();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key in gameRef.current.keys) {
        gameRef.current.keys[e.key as keyof typeof gameRef.current.keys] = true;
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key in gameRef.current.keys) {
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

  const update = useCallback(() => {
    if (!gameRef.current.active) return;

    const { player, ai, ball, keys } = gameRef.current;

    // Player movement
    const pSpeed = 6;
    if (keys.ArrowUp) player.y = Math.max(player.radius, player.y - pSpeed);
    if (keys.ArrowDown) player.y = Math.min(CANVAS_HEIGHT - player.radius, player.y + pSpeed);
    if (keys.ArrowLeft) player.x = Math.max(player.radius, player.x - pSpeed);
    if (keys.ArrowRight) player.x = Math.min(CANVAS_WIDTH / 2 - player.radius, player.x + pSpeed);

    // AI movement
    const aiSpeed = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4.5 : 6;
    if (ball.x > CANVAS_WIDTH / 3) {
      if (ball.y < ai.y - 10) ai.y -= aiSpeed;
      if (ball.y > ai.y + 10) ai.y += aiSpeed;
      if (ball.x > ai.x + 20) ai.x += aiSpeed * 0.5;
      if (ball.x < ai.x - 20) ai.x -= aiSpeed * 0.8;
    } else {
      // Return to position
      if (ai.x < CANVAS_WIDTH - 150) ai.x += 2;
      if (ai.y < CANVAS_HEIGHT / 2) ai.y += 2;
      if (ai.y > CANVAS_HEIGHT / 2) ai.y -= 2;
    }
    // Constraints for AI
    ai.x = Math.max(CANVAS_WIDTH / 2 + ai.radius, Math.min(CANVAS_WIDTH - ai.radius, ai.x));
    ai.y = Math.max(ai.radius, Math.min(CANVAS_HEIGHT - ai.radius, ai.y));

    // Ball physics
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vx *= 0.99;
    ball.vy *= 0.99;

    // Wall collisions
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > CANVAS_HEIGHT) {
      ball.vy *= -0.9;
      ball.y = ball.y < ball.radius ? ball.radius : CANVAS_HEIGHT - ball.radius;
    }

    // Goal detection
    if (ball.x < 0) {
      if (ball.y > (CANVAS_HEIGHT - GOAL_HEIGHT) / 2 && ball.y < (CANVAS_HEIGHT + GOAL_HEIGHT) / 2) {
        setScores(s => ({ ...s, ai: s.ai + 1 }));
        resetBall('ai');
      } else {
        ball.vx *= -0.9;
        ball.x = ball.radius;
      }
    }
    if (ball.x > CANVAS_WIDTH) {
      if (ball.y > (CANVAS_HEIGHT - GOAL_HEIGHT) / 2 && ball.y < (CANVAS_HEIGHT + GOAL_HEIGHT) / 2) {
        setScores(s => ({ ...s, player: s.player + 1 }));
        resetBall('player');
      } else {
        ball.vx *= -0.9;
        ball.x = CANVAS_WIDTH - ball.radius;
      }
    }

    // Collision Player-Ball
    const distP = Math.hypot(player.x - ball.x, player.y - ball.y);
    if (distP < player.radius + ball.radius) {
      const angle = Math.atan2(ball.y - player.y, ball.x - player.x);
      const force = 12;
      ball.vx = Math.cos(angle) * force;
      ball.vy = Math.sin(angle) * force;
      ball.x = player.x + Math.cos(angle) * (player.radius + ball.radius);
      ball.y = player.y + Math.sin(angle) * (player.radius + ball.radius);
    }

    // Collision AI-Ball
    const distA = Math.hypot(ai.x - ball.x, ai.y - ball.y);
    if (distA < ai.radius + ball.radius) {
      const angle = Math.atan2(ball.y - ai.y, ball.x - ai.x);
      const force = 12;
      ball.vx = Math.cos(angle) * force;
      ball.vy = Math.sin(angle) * force;
      ball.x = ai.x + Math.cos(angle) * (ai.radius + ball.radius);
      ball.y = ai.y + Math.sin(angle) * (ai.radius + ball.radius);
    }

  }, [difficulty, resetBall]);

  useEffect(() => {
    const loop = setInterval(update, 1000 / 60);
    return () => clearInterval(loop);
  }, [update]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Field lines
    ctx.strokeStyle = LINE_COLOR;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 80, 0, Math.PI * 2);
    ctx.stroke();

    // Goals
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, (CANVAS_HEIGHT - GOAL_HEIGHT) / 2, 10, GOAL_HEIGHT);
    ctx.fillRect(CANVAS_WIDTH - 10, (CANVAS_HEIGHT - GOAL_HEIGHT) / 2, 10, GOAL_HEIGHT);

    // Players
    const { player, ai, ball } = gameRef.current;
    
    // Draw Player
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw AI
    ctx.fillStyle = ai.color;
    ctx.beginPath();
    ctx.arc(ai.x, ai.y, ai.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    // Draw Ball
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 15;
    ctx.shadowColor = ball.color;
    ctx.fill();
    ctx.shadowBlur = 0;

  }, [scores]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-slate-900 p-4 font-sans">
      <div className="w-full max-w-[800px] flex justify-between items-center mb-4 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg">
        <div className="text-center">
          <div className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">Player</div>
          <div className="text-3xl font-mono text-white">{scores.player}</div>
        </div>
        <div className="text-slate-500 font-bold text-xl">VS</div>
        <div className="text-center">
          <div className="text-rose-500 text-xs font-bold uppercase tracking-widest mb-1">AI ({difficulty})</div>
          <div className="text-3xl font-mono text-white">{scores.ai}</div>
        </div>
      </div>

      <div className="relative border-4 border-slate-700 rounded-lg overflow-hidden shadow-2xl bg-black">
        <canvas 
          ref={canvasRef} 
          width={CANVAS_WIDTH} 
          height={CANVAS_HEIGHT} 
          className="max-w-full h-auto block"
        />
        
        {!gameStarted && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">SLIMY SOCCER</h2>
            <p className="text-slate-400 mb-8 max-w-md">Use Arrow Keys to move your slime. Outscore the AI to win!</p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => startGame('easy')} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition">EASY</button>
              <button onClick={() => startGame('medium')} className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition">MEDIUM</button>
              <button onClick={() => startGame('hard')} className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition">HARD</button>
            </div>
          </div>
        )}
      </div>

      {gameStarted && (
        <button 
          onClick={() => setGameStarted(false)} 
          className="mt-6 px-4 py-1 text-slate-500 hover:text-white text-sm font-bold transition"
        >
          RESET MATCH
        </button>
      )}
    </div>
  );
};

export default SlimyGame;
