import React, { useEffect, useRef, useState, useCallback } from 'react';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
const GRAVITY = 0.6;
const JUMP_STRENGTH = -8;
const PIPE_SPEED = 3.5;
const PIPE_SPAWN_RATE = 1500; // ms
const PIPE_WIDTH = 60;
const PIPE_GAP = 160;

interface Pipe {
  x: number;
  topHeight: number;
  passed: boolean;
}

const FlappyBirdGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [birdY, setBirdY] = useState(CANVAS_HEIGHT / 2);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const requestRef = useRef<number | undefined>(undefined);
  const lastPipeTimeRef = useRef<number>(0);

  const jump = useCallback(() => {
    if (gameOver) {
      resetGame();
      return;
    }
    if (!gameStarted) {
      setGameStarted(true);
    }
    setBirdVelocity(JUMP_STRENGTH);
  }, [gameOver, gameStarted]);

  const resetGame = () => {
    setBirdY(CANVAS_HEIGHT / 2);
    setBirdVelocity(0);
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    lastPipeTimeRef.current = 0;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  const update = useCallback((time: number) => {
    if (gameOver || !gameStarted) return;

    setBirdY(y => {
      const newY = y + birdVelocity;
      if (newY < 0 || newY > CANVAS_HEIGHT - 30) {
        setGameOver(true);
        return y;
      }
      return newY;
    });
    setBirdVelocity(v => v + GRAVITY);

    if (time - lastPipeTimeRef.current > PIPE_SPAWN_RATE) {
      const minPipeHeight = 50;
      const maxPipeHeight = CANVAS_HEIGHT - PIPE_GAP - minPipeHeight;
      const topHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1)) + minPipeHeight;
      
      setPipes(prev => [...prev, { x: CANVAS_WIDTH, topHeight, passed: false }]);
      lastPipeTimeRef.current = time;
    }

    setPipes(prev => {
      const updatedPipes = prev
        .map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
        .filter(pipe => pipe.x + PIPE_WIDTH > 0);

      // Check collisions
      const birdRect = { x: 50, y: birdY, width: 34, height: 24 };
      
      for (const pipe of updatedPipes) {
        const topPipeRect = { x: pipe.x, y: 0, width: PIPE_WIDTH, height: pipe.topHeight };
        const bottomPipeRect = { x: pipe.x, y: pipe.topHeight + PIPE_GAP, width: PIPE_WIDTH, height: CANVAS_HEIGHT };

        if (
          checkCollision(birdRect, topPipeRect) ||
          checkCollision(birdRect, bottomPipeRect)
        ) {
          setGameOver(true);
        }

        if (!pipe.passed && pipe.x < 50) {
          pipe.passed = true;
          setScore(s => s + 1);
        }
      }

      return updatedPipes;
    });

    requestRef.current = requestAnimationFrame(update);
  }, [birdVelocity, birdY, gameOver, gameStarted]);

  const checkCollision = (r1: any, r2: any) => {
    return r1.x < r2.x + r2.width &&
           r1.x + r1.width > r2.x &&
           r1.y < r2.y + r2.height &&
           r1.y + r1.height > r2.y;
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [update]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Sky
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Pipes
    pipes.forEach(pipe => {
      ctx.fillStyle = '#73be2e';
      ctx.strokeStyle = '#53811e';
      ctx.lineWidth = 3;

      // Top pipe
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
      ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
      
      // Top pipe cap
      ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, PIPE_WIDTH + 10, 20);
      ctx.strokeRect(pipe.x - 5, pipe.topHeight - 20, PIPE_WIDTH + 10, 20);

      // Bottom pipe
      const bottomY = pipe.topHeight + PIPE_GAP;
      ctx.fillRect(pipe.x, bottomY, PIPE_WIDTH, CANVAS_HEIGHT - bottomY);
      ctx.strokeRect(pipe.x, bottomY, PIPE_WIDTH, CANVAS_HEIGHT - bottomY);
      
      // Bottom pipe cap
      ctx.fillRect(pipe.x - 5, bottomY, PIPE_WIDTH + 10, 20);
      ctx.strokeRect(pipe.x - 5, bottomY, PIPE_WIDTH + 10, 20);
    });

    // Bird
    ctx.save();
    ctx.translate(50 + 17, birdY + 12);
    const rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, birdVelocity * 0.1));
    ctx.rotate(rotation);
    
    // Bird body
    ctx.fillStyle = '#f7d308';
    ctx.beginPath();
    ctx.ellipse(0, 0, 17, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Eye
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(8, -4, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(10, -4, 2, 0, Math.PI * 2);
    ctx.fill();

    // Beak
    ctx.fillStyle = '#f75608';
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(22, 4);
    ctx.lineTo(12, 8);
    ctx.fill();

    ctx.restore();

    // UI
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 4;
    ctx.fillText(score.toString(), CANVAS_WIDTH / 2, 80);
    ctx.shadowBlur = 0;

    if (!gameStarted && !gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('Press SPACE to Start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    }

    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 40px sans-serif';
      ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
      ctx.font = '24px sans-serif';
      ctx.fillText(`Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
      ctx.font = '18px sans-serif';
      ctx.fillText('Press SPACE to Restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 80);
    }
  }, [birdY, birdVelocity, pipes, score, gameOver, gameStarted]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-blue-100 p-4" onClick={jump}>
      <div className="relative border-8 border-white rounded-2xl overflow-hidden shadow-2xl cursor-pointer">
        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="max-w-full h-auto" />
      </div>
      <div className="mt-4 text-blue-800 font-bold">
        Click or Press SPACE to Flap
      </div>
    </div>
  );
};

export default FlappyBirdGame;
