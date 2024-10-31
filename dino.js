// Select elements
const startButton = document.getElementById('start-btn');
const gameBoard = document.getElementById('game-board');

// Game settings
let boardWidth = 750;
let boardHeight = 250;
let context;
let gameRunning = false;

// Dino properties
let dino = { x: 50, y: boardHeight - 30, width: 30, height: 30, velocityY: 0 };
let gravity = 0.5;

// Obstacles
let obstacles = [];
let obstacleSpeed = 5;
let score = 0;
let gameOverText = "";

// Initialize game
gameBoard.width = boardWidth;
gameBoard.height = boardHeight;
context = gameBoard.getContext('2d');

// Start Game button event listener
startButton.addEventListener('click', () => {
  startButton.style.display = 'none'; // Hide the button
  gameBoard.style.display = 'block'; // Show the canvas
  gameRunning = true;
  score = 0; // Reset score
  gameOverText = ""; // Clear game over message
  requestAnimationFrame(updateGame);
});

// Game update loop
function updateGame() {
  if (!gameRunning) return;

  context.clearRect(0, 0, boardWidth, boardHeight);
  drawDino();
  handleObstacles();
  drawScore();
  if (gameOverText) drawGameOver(); // If game over, display the message

  requestAnimationFrame(updateGame);
}

// Draw the Dino
function drawDino() {
  dino.velocityY += gravity;
  dino.y = Math.min(dino.y + dino.velocityY, boardHeight - dino.height);
  context.fillStyle = 'green';
  context.fillRect(dino.x, dino.y, dino.width, dino.height);
}

// Handle obstacles
function handleObstacles() {
  if (Math.random() < 0.01) {
    obstacles.push({ x: boardWidth, y: boardHeight - 20, width: 20, height: 20 });
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obs = obstacles[i];
    obs.x -= obstacleSpeed;

    context.fillStyle = 'red';
    context.fillRect(obs.x, obs.y, obs.width, obs.height);

    if (obs.x + obs.width < 0) {
      obstacles.splice(i, 1); // Remove off-screen obstacles
      score++; // Increase score
      if (score % 5 === 0) obstacleSpeed++; // Increase speed every 5 points
    }

    if (detectCollision(dino, obs)) {
      gameOver();
    }
  }
}

// Collision detection
function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// Display score
function drawScore() {
  context.fillStyle = 'black';
  context.font = '20px Arial';
  context.fillText(`Score: ${score}`, 10, 20);
}

// Display game over message
function drawGameOver() {
  context.fillStyle = 'black';
  context.font = '30px Arial';
  context.fillText(gameOverText, boardWidth / 2 - 100, boardHeight / 2);
}

// Game over logic
function gameOver() {
  gameRunning = false;
  gameOverText = `Game Over! Score: ${score}`;
  resetGame();
}

// Reset game
function resetGame() {
  obstacles = [];
  obstacleSpeed = 5;
  dino.y = boardHeight - dino.height;
  dino.velocityY = 0;
  startButton.style.display = 'block'; // Show start button again
  gameBoard.style.display = 'none'; // Hide the canvas
}

// Jump when the space key is pressed
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && dino.y === boardHeight - dino.height) {
    dino.velocityY = -10;
  }
});
