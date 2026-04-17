const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let score = 0;
let best = localStorage.getItem('snakeBest') || 0;
let gameRunning = false;
let gamePaused = false;

document.getElementById('best').textContent = best;

document.addEventListener('keydown', handleKeyPress);
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', togglePause);

function handleKeyPress(e) {
  if (!gameRunning) return;
  
  switch(e.key) {
    case 'ArrowUp':
      if (direction.y === 0) nextDirection = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) nextDirection = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) nextDirection = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) nextDirection = { x: 1, y: 0 };
      break;
  }
}

function startGame() {
  if (!gameRunning) {
    gameRunning = true;
    gamePaused = false;
    document.getElementById('startBtn').textContent = 'Restart';
    document.getElementById('pauseBtn').disabled = false;
    gameLoop();
  }
}

function togglePause() {
  if (gameRunning) {
    gamePaused = !gamePaused;
    document.getElementById('pauseBtn').textContent = gamePaused ? 'Resume' : 'Pause';
    if (!gamePaused) gameLoop();
  }
}

function gameLoop() {
  if (gamePaused) {
    setTimeout(gameLoop, 100);
    return;
  }

  update();
  draw();
  
  if (gameRunning) {
    setTimeout(gameLoop, 100);
  }
}

function update() {
  direction = nextDirection;
  
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  
  // Check collision with walls
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    gameOver();
    return;
  }
  
  // Check collision with self
  if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
    gameOver();
    return;
  }
  
  snake.unshift(head);
  
  // Check if food eaten
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById('score').textContent = score;
    spawnFood();
  } else {
    snake.pop();
  }
}

function draw() {
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw snake
  ctx.fillStyle = '#667eea';
  snake.forEach((segment, index) => {
    ctx.fillRect(
      segment.x * gridSize + 1,
      segment.y * gridSize + 1,
      gridSize - 2,
      gridSize - 2
    );
  });
  
  // Draw head with different color
  ctx.fillStyle = '#764ba2';
  ctx.fillRect(
    snake[0].x * gridSize + 1,
    snake[0].y * gridSize + 1,
    gridSize - 2,
    gridSize - 2
  );
  
  // Draw food
  ctx.fillStyle = '#ff6b6b';
  ctx.beginPath();
  ctx.arc(
    food.x * gridSize + gridSize / 2,
    food.y * gridSize + gridSize / 2,
    gridSize / 2 - 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

function spawnFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } while (snake.some(seg => seg.x === newFood.x && seg.y === newFood.y));
  
  food = newFood;
}

function gameOver() {
  gameRunning = false;
  document.getElementById('pauseBtn').disabled = true;
  
  if (score > best) {
    best = score;
    localStorage.setItem('snakeBest', best);
    document.getElementById('best').textContent = best;
  }
  
  alert(`Game Over! Score: ${score}`);
  
  snake = [{ x: 10, y: 10 }];
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  score = 0;
  document.getElementById('score').textContent = score;
  spawnFood();
  draw();
}
