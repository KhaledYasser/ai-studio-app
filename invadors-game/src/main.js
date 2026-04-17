const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 40;
const ENEMY_WIDTH = 40;
const ENEMY_HEIGHT = 40;
const BULLET_WIDTH = 5;
const BULLET_HEIGHT = 15;

let player = {
  x: canvas.width / 2 - PLAYER_WIDTH / 2,
  y: canvas.height - 60,
  width: PLAYER_WIDTH,
  height: PLAYER_HEIGHT,
  speed: 5
};

let enemies = [];
let bullets = [];
let enemyBullets = [];
let score = 0;
let lives = 3;
let level = 1;
let gameRunning = false;
let gamePaused = false;
let keys = {};
let gameLoopId = null;

const keys_map = {
  'ArrowLeft': false,
  'ArrowRight': false,
  ' ': false
};

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', togglePause);

function handleKeyDown(e) {
  if (e.key in keys_map) {
    keys_map[e.key] = true;
    if (e.key === ' ') e.preventDefault();
  }
}

function handleKeyUp(e) {
  if (e.key in keys_map) {
    keys_map[e.key] = false;
  }
}

function startGame() {
  if (!gameRunning) {
    gameRunning = true;
    gamePaused = false;
    document.getElementById('startBtn').textContent = 'Restart';
    document.getElementById('pauseBtn').disabled = false;
    
    if (enemies.length === 0) {
      spawnEnemies();
    }
    
    gameLoop();
  }
}

function togglePause() {
  gamePaused = !gamePaused;
  document.getElementById('pauseBtn').textContent = gamePaused ? 'Resume' : 'Pause';
  if (!gamePaused) gameLoop();
}

function spawnEnemies() {
  enemies = [];
  const enemiesPerRow = 6;
  const rows = 2 + level;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < enemiesPerRow; col++) {
      enemies.push({
        x: 50 + col * 80,
        y: 30 + row * 60,
        width: ENEMY_WIDTH,
        height: ENEMY_HEIGHT,
        speed: 1 + level * 0.5,
        direction: 1,
        shootChance: 0.003 + level * 0.001
      });
    }
  }
}

function gameLoop() {
  if (gamePaused) {
    setTimeout(gameLoop, 30);
    return;
  }
  
  update();
  draw();
  
  if (gameRunning) {
    setTimeout(gameLoop, 30);
  }
}

function update() {
  // Move player
  if (keys_map['ArrowLeft'] && player.x > 0) {
    player.x -= player.speed;
  }
  if (keys_map['ArrowRight'] && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }
  if (keys_map[' ']) {
    shoot();
    keys_map[' '] = false;
  }
  
  // Move enemies
  let changeDirection = false;
  for (let enemy of enemies) {
    enemy.x += enemy.speed * enemy.direction;
    
    if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
      changeDirection = true;
    }
    
    if (Math.random() < enemy.shootChance) {
      enemyShoot(enemy);
    }
  }
  
  if (changeDirection) {
    for (let enemy of enemies) {
      enemy.direction *= -1;
      enemy.y += 30;
    }
  }
  
  // Move bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= 7;
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
    }
  }
  
  // Move enemy bullets
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    enemyBullets[i].y += 5;
    if (enemyBullets[i].y > canvas.height) {
      enemyBullets.splice(i, 1);
    }
  }
  
  // Collision detection
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = enemies.length - 1; j >= 0; j--) {
      if (checkCollision(bullets[i], enemies[j])) {
        bullets.splice(i, 1);
        enemies.splice(j, 1);
        score += 10 * level;
        break;
      }
    }
  }
  
  // Check enemy bullets vs player
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    if (checkCollision(enemyBullets[i], player)) {
      enemyBullets.splice(i, 1);
      lives--;
      document.getElementById('lives').textContent = lives;
      
      if (lives <= 0) {
        gameRunning = false;
        alert(`Game Over! Final Score: ${score}`);
        score = 0;
        lives = 3;
        level = 1;
        document.getElementById('score').textContent = score;
        document.getElementById('lives').textContent = lives;
        document.getElementById('level').textContent = level;
      }
    }
  }
  
  // Check if all enemies destroyed
  if (enemies.length === 0 && gameRunning) {
    level++;
    document.getElementById('level').textContent = level;
    spawnEnemies();
  }
  
  document.getElementById('score').textContent = score;
}

function shoot() {
  bullets.push({
    x: player.x + player.width / 2 - BULLET_WIDTH / 2,
    y: player.y,
    width: BULLET_WIDTH,
    height: BULLET_HEIGHT
  });
}

function enemyShoot(enemy) {
  enemyBullets.push({
    x: enemy.x + enemy.width / 2 - 3,
    y: enemy.y + enemy.height,
    width: 5,
    height: 15
  });
}

function checkCollision(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
}

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw player
  ctx.fillStyle = '#00ff99';
  ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.fillStyle = '#00ffcc';
  ctx.beginPath();
  ctx.moveTo(player.x + player.width / 2, player.y);
  ctx.lineTo(player.x + 10, player.y + player.height);
  ctx.lineTo(player.x + player.width - 10, player.y + player.height);
  ctx.fill();
  
  // Draw enemies
  ctx.fillStyle = '#ff3366';
  for (let enemy of enemies) {
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.fillStyle = '#ff6699';
    ctx.fillRect(enemy.x + 5, enemy.y + 5, enemy.width - 10, enemy.height - 10);
    ctx.fillStyle = '#ff3366';
  }
  
  // Draw bullets
  ctx.fillStyle = '#ffff00';
  for (let bullet of bullets) {
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  }
  
  // Draw enemy bullets
  ctx.fillStyle = '#ff6666';
  for (let bullet of enemyBullets) {
    ctx.beginPath();
    ctx.arc(bullet.x + 2.5, bullet.y + 7.5, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

draw();
