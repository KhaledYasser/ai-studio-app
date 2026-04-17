const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const nextCanvas = document.getElementById('nextCanvas');
const nextCtx = nextCanvas.getContext('2d');

const ROWS = 20;
const COLS = 12;
const BLOCK_SIZE = canvas.width / COLS;

const PIECES = [
  [[1,1,1,1]],
  [[1,1],[1,1]],
  [[0,1,0],[1,1,1]],
  [[1,0,0],[1,1,1]],
  [[0,0,1],[1,1,1]],
  [[0,1,1],[1,1,0]],
  [[1,1,0],[0,1,1]]
];

const COLORS = ['#00f0f0', '#ffff00', '#800080', '#0000ff', '#ff7700', '#00ff00', '#ff0000'];

let board = [];
let currentPiece = null;
let nextPiece = null;
let score = 0;
let lines = 0;
let level = 1;
let gameRunning = false;
let gamePaused = false;
let dropInterval = 800;
let lastDropTime = 0;

for (let i = 0; i < ROWS; i++) {
  board[i] = new Array(COLS).fill(0);
}

document.addEventListener('keydown', handleKeyPress);
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', togglePause);

function getRandomPiece() {
  const index = Math.floor(Math.random() * PIECES.length);
  return {
    shape: PIECES[index],
    color: COLORS[index],
    x: Math.floor(COLS / 2) - 1,
    y: 0
  };
}

function startGame() {
  if (!gameRunning) {
    gameRunning = true;
    gamePaused = false;
    document.getElementById('startBtn').textContent = 'Restart';
    document.getElementById('pauseBtn').disabled = false;
    if (!currentPiece) {
      currentPiece = getRandomPiece();
      nextPiece = getRandomPiece();
    }
    gameLoop();
  }
}

function togglePause() {
  gamePaused = !gamePaused;
  document.getElementById('pauseBtn').textContent = gamePaused ? 'Resume' : 'Pause';
  if (!gamePaused) gameLoop();
}

function handleKeyPress(e) {
  if (!gameRunning || gamePaused) return;
  
  switch(e.key) {
    case 'ArrowLeft':
      movePiece(-1, 0);
      break;
    case 'ArrowRight':
      movePiece(1, 0);
      break;
    case 'ArrowUp':
      rotatePiece();
      break;
    case 'ArrowDown':
      if (movePiece(0, 1)) {
        score += 1;
      }
      break;
  }
}

function movePiece(dx, dy) {
  const newX = currentPiece.x + dx;
  const newY = currentPiece.y + dy;
  
  if (isValidMove(currentPiece.shape, newX, newY)) {
    currentPiece.x = newX;
    currentPiece.y = newY;
    return true;
  }
  
  if (dy > 0) {
    lockPiece();
    clearLines();
    currentPiece = nextPiece;
    nextPiece = getRandomPiece();
    
    if (!isValidMove(currentPiece.shape, currentPiece.x, currentPiece.y)) {
      gameRunning = false;
      alert(`Game Over! Score: ${score}`);
      score = 0;
      lines = 0;
      level = 1;
      board = [];
      for (let i = 0; i < ROWS; i++) {
        board[i] = new Array(COLS).fill(0);
      }
    }
  }
  
  return false;
}

function rotatePiece() {
  const rotated = currentPiece.shape[0].length === currentPiece.shape.length ?
    currentPiece.shape.map((_, i) => currentPiece.shape.map(row => row[i]).reverse()) :
    currentPiece.shape[0].map((_, i) => currentPiece.shape.map(row => row[i]));
  
  const oldShape = currentPiece.shape;
  currentPiece.shape = rotated;
  
  if (!isValidMove(currentPiece.shape, currentPiece.x, currentPiece.y)) {
    currentPiece.shape = oldShape;
  }
}

function isValidMove(shape, x, y) {
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const boardX = x + col;
        const boardY = y + row;
        
        if (boardX < 0 || boardX >= COLS || boardY >= ROWS) return false;
        if (boardY >= 0 && board[boardY][boardX]) return false;
      }
    }
  }
  return true;
}

function lockPiece() {
  for (let row = 0; row < currentPiece.shape.length; row++) {
    for (let col = 0; col < currentPiece.shape[row].length; col++) {
      if (currentPiece.shape[row][col]) {
        const boardY = currentPiece.y + row;
        const boardX = currentPiece.x + col;
        if (boardY >= 0) {
          board[boardY][boardX] = currentPiece.color;
        }
      }
    }
  }
}

function clearLines() {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row].every(cell => cell)) {
      board.splice(row, 1);
      board.unshift(new Array(COLS).fill(0));
      lines++;
      score += 100;
      level = Math.floor(lines / 10) + 1;
      dropInterval = Math.max(100, 800 - level * 50);
    }
  }
  
  document.getElementById('score').textContent = score;
  document.getElementById('lines').textContent = lines;
  document.getElementById('level').textContent = level;
}

function gameLoop() {
  if (gamePaused) {
    setTimeout(gameLoop, 100);
    return;
  }
  
  const now = Date.now();
  if (now - lastDropTime > dropInterval) {
    movePiece(0, 1);
    lastDropTime = now;
  }
  
  draw();
  
  if (gameRunning) {
    setTimeout(gameLoop, 30);
  }
}

function draw() {
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  for (let i = 0; i <= COLS; i++) {
    ctx.beginPath();
    ctx.moveTo(i * BLOCK_SIZE, 0);
    ctx.lineTo(i * BLOCK_SIZE, canvas.height);
    ctx.stroke();
  }
  
  for (let i = 0; i <= ROWS; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * BLOCK_SIZE);
    ctx.lineTo(canvas.width, i * BLOCK_SIZE);
    ctx.stroke();
  }
  
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col]) {
        ctx.fillStyle = board[row][col];
        ctx.fillRect(col * BLOCK_SIZE + 1, row * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
      }
    }
  }
  
  if (currentPiece) {
    ctx.fillStyle = currentPiece.color;
    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col]) {
          ctx.fillRect(
            (currentPiece.x + col) * BLOCK_SIZE + 1,
            (currentPiece.y + row) * BLOCK_SIZE + 1,
            BLOCK_SIZE - 2,
            BLOCK_SIZE - 2
          );
        }
      }
    }
  }
  
  drawNextPiece();
}

function drawNextPiece() {
  nextCtx.fillStyle = '#111';
  nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
  
  if (nextPiece) {
    nextCtx.fillStyle = nextPiece.color;
    const offsetX = (nextCanvas.width - nextPiece.shape[0].length * 15) / 2;
    const offsetY = (nextCanvas.height - nextPiece.shape.length * 15) / 2;
    
    for (let row = 0; row < nextPiece.shape.length; row++) {
      for (let col = 0; col < nextPiece.shape[row].length; col++) {
        if (nextPiece.shape[row][col]) {
          nextCtx.fillRect(offsetX + col * 15 + 1, offsetY + row * 15 + 1, 13, 13);
        }
      }
    }
  }
}

draw();
