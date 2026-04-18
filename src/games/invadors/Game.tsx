import React, { useEffect, useRef, useState, useCallback } from 'react';

const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 40;
const ENEMY_WIDTH = 30;
const ENEMY_HEIGHT = 30;
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 12;

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Enemy extends GameObject {
  direction: number;
  shootChance: number;
  type: number;
}

const InvadorsGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<{
    player: GameObject;
    enemies: Enemy[];
    bullets: GameObject[];
    enemyBullets: GameObject[];
    score: number;
    lives: number;
    level: number;
    gameOver: boolean;
    isPaused: boolean;
  }>({
    player: { x: 230, y: 540, width: PLAYER_WIDTH, height: PLAYER_HEIGHT },
    enemies: [],
    bullets: [],
    enemyBullets: [],
    score: 0,
    lives: 3,
    level: 1,
    gameOver: false,
    isPaused: true
  });

  const keysRef = useRef<Record<string, boolean>>({});

  const spawnEnemies = useCallback((level: number) => {
    const enemies: Enemy[] = [];
    const enemiesPerRow = 8;
    const rows = Math.min(3 + Math.floor(level / 2), 6);
    const spacing = 50;
    const offsetX = (500 - (enemiesPerRow * spacing)) / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < enemiesPerRow; col++) {
        enemies.push({
          x: offsetX + col * spacing,
          y: 50 + row * spacing,
          width: ENEMY_WIDTH,
          height: ENEMY_HEIGHT,
          direction: 1,
          shootChance: 0.001 + level * 0.0005,
          type: row % 3
        });
      }
    }
    return enemies;
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      player: { x: 230, y: 540, width: PLAYER_WIDTH, height: PLAYER_HEIGHT },
      enemies: spawnEnemies(1),
      bullets: [],
      enemyBullets: [],
      score: 0,
      lives: 3,
      level: 1,
      gameOver: false,
      isPaused: false
    });
  }, [spawnEnemies]);

  useEffect(() => {
    setGameState(prev => ({ ...prev, enemies: spawnEnemies(1) }));
  }, [spawnEnemies]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      if (e.key === ' ') e.preventDefault();
      if (e.key === 'p' || e.key === 'P') {
        setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
      }
      if (e.key === 'r' || e.key === 'R') {
        resetGame();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [resetGame]);

  const checkCollision = (rect1: GameObject, rect2: GameObject) => {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  };

  const update = useCallback(() => {
    setGameState(prev => {
      if (prev.isPaused || prev.gameOver) return prev;

      let { player, enemies, bullets, enemyBullets, score, lives, level, gameOver } = prev;

      // Move player
      if (keysRef.current['ArrowLeft'] && player.x > 0) player.x -= 5;
      if (keysRef.current['ArrowRight'] && player.x < 500 - player.width) player.x += 5;

      // Shoot
      if (keysRef.current[' '] && bullets.length < 3) {
        bullets = [...bullets, {
          x: player.x + player.width / 2 - BULLET_WIDTH / 2,
          y: player.y,
          width: BULLET_WIDTH,
          height: BULLET_HEIGHT
        }];
        keysRef.current[' '] = false; // Prevent rapid fire
      }

      // Move enemies
      let changeDirection = false;
      const moveSpeed = 1 + level * 0.2;
      
      const updatedEnemies = enemies.map(enemy => {
        const newX = enemy.x + (moveSpeed * enemy.direction);
        if (newX <= 0 || newX + enemy.width >= 500) changeDirection = true;
        
        // Enemy shooting
        if (Math.random() < enemy.shootChance) {
          enemyBullets = [...enemyBullets, {
            x: enemy.x + enemy.width / 2 - 2,
            y: enemy.y + enemy.height,
            width: 4,
            height: 10
          }];
        }
        
        return { ...enemy, x: newX };
      });

      if (changeDirection) {
        updatedEnemies.forEach(enemy => {
          enemy.direction *= -1;
          enemy.y += 20;
          if (enemy.y + enemy.height >= player.y) gameOver = true;
        });
      }

      // Move bullets
      bullets = bullets
        .map(b => ({ ...b, y: b.y - 7 }))
        .filter(b => b.y > 0);

      enemyBullets = enemyBullets
        .map(b => ({ ...b, y: b.y + 4 }))
        .filter(b => b.y < 600);

      // Collisions: Bullets vs Enemies
      const filteredEnemies = [...updatedEnemies];
      const filteredBullets = [...bullets];

      for (let i = filteredBullets.length - 1; i >= 0; i--) {
        for (let j = filteredEnemies.length - 1; j >= 0; j--) {
          if (checkCollision(filteredBullets[i], filteredEnemies[j])) {
            filteredBullets.splice(i, 1);
            filteredEnemies.splice(j, 1);
            score += 10;
            break;
          }
        }
      }

      // Collisions: Enemy Bullets vs Player
      for (let i = enemyBullets.length - 1; i >= 0; i--) {
        if (checkCollision(enemyBullets[i], player)) {
          enemyBullets.splice(i, 1);
          lives--;
          if (lives <= 0) gameOver = true;
        }
      }

      // Level up
      if (filteredEnemies.length === 0) {
        level++;
        return {
          ...prev,
          enemies: spawnEnemies(level),
          bullets: [],
          enemyBullets: [],
          level,
          score: score + 100
        };
      }

      return {
        ...prev,
        player,
        enemies: filteredEnemies,
        bullets: filteredBullets,
        enemyBullets,
        score,
        lives,
        gameOver
      };
    });
  }, [spawnEnemies]);

  useEffect(() => {
    const loop = setInterval(update, 1000 / 60);
    return () => clearInterval(loop);
  }, [update]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 500, 600);

    // Starfield effect (static for now)
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 50; i++) {
      ctx.fillRect((i * 137) % 500, (i * 253) % 600, 1, 1);
    }

    // Player
    ctx.fillStyle = '#00ff99';
    const p = gameState.player;
    ctx.fillRect(p.x, p.y, p.width, p.height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(p.x + p.width/2 - 2, p.y - 5, 4, 10);

    // Enemies
    gameState.enemies.forEach(enemy => {
      ctx.fillStyle = enemy.type === 0 ? '#ff3366' : enemy.type === 1 ? '#ffcc00' : '#33ccff';
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillRect(enemy.x + 5, enemy.y + 5, 5, 5);
      ctx.fillRect(enemy.x + enemy.width - 10, enemy.y + 5, 5, 5);
    });

    // Bullets
    ctx.fillStyle = '#ffff00';
    gameState.bullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));

    // Enemy Bullets
    ctx.fillStyle = '#ff6666';
    gameState.enemyBullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));

    // UI
    if (gameState.gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.fillRect(0, 0, 500, 600);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 40px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('MISSION FAILED', 250, 280);
      ctx.font = '20px sans-serif';
      ctx.fillText(`Final Score: ${gameState.score}`, 250, 320);
      ctx.fillText('Press R to Restart', 250, 380);
    } else if (gameState.isPaused) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, 500, 600);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 40px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSED', 250, 300);
      ctx.font = '20px sans-serif';
      ctx.fillText('Press P to Resume or SPACE to Start', 250, 350);
    }

  }, [gameState]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-black text-white p-4">
      <div className="flex justify-between w-full max-w-[500px] mb-4 font-mono text-lg">
        <div className="text-emerald-400">SCORE: {gameState.score.toString().padStart(5, '0')}</div>
        <div className="text-blue-400">LEVEL: {gameState.level}</div>
        <div className="text-red-400">LIVES: {'❤️'.repeat(gameState.lives)}</div>
      </div>
      <div className="relative border-4 border-gray-800 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,255,153,0.2)]">
        <canvas ref={canvasRef} width={500} height={600} className="max-w-full h-auto" />
      </div>
      <div className="mt-4 text-gray-500 text-sm">
        Arrows to Move | Space to Fire | P to Pause | R to Reset
      </div>
    </div>
  );
};

export default InvadorsGame;
