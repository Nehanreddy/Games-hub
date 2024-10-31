// Variables
let board, context;
let boardWidth = 480;
let boardHeight = 320;
let isGameStarted = false;
let gameOver = false;
let score = 0;

let player = {
    width: 80,
    height: 10,
    x: 0,
    y: boardHeight - 15,
    velocityX: 10
};

let ball = {
    width: 10,
    height: 10,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0
};

let blocks = [];
let blockWidth = 50;
let blockHeight = 10;
let blockRows = 3;
let blockColumns = 8;

// Initialize game on page load
window.onload = () => {
    board = document.getElementById("brickCanvas");
    context = board.getContext("2d");

    resetPositions();
    createBlocks();

    document.addEventListener("keydown", startGame);
    document.addEventListener("keydown", movePlayer);

    requestAnimationFrame(update);
};

// Start game on key press
function startGame() {
    if (!isGameStarted && !gameOver) {
        isGameStarted = true;
        ball.velocityX = 3;
        ball.velocityY = -2;
    }
}

// Game update function
function update() {
    if (gameOver) return;

    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // Draw player
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    // Draw ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    // Ball collision with walls
    if (ball.x <= 0 || ball.x + ball.width >= boardWidth) {
        ball.velocityX *= -1;
    }
    if (ball.y <= 0) {
        ball.velocityY *= -1;
    }
    if (ball.y + ball.height >= boardHeight) {
        endGame();
    }

    // Ball collision with player
    if (detectCollision(ball, player)) {
        ball.velocityY *= -1;
    }

    // Ball collision with blocks
    blocks.forEach((block, index) => {
        if (!block.break && detectCollision(ball, block)) {
            ball.velocityY *= -1;
            block.break = true;
            score += 100;
        }
    });

    // Draw blocks
    blocks.forEach(block => {
        if (!block.break) {
            context.fillStyle = "skyblue";
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    });

    // Display score
    context.font = "20px Arial";
    context.fillText(`Score: ${score}`, 10, 25);
}

// Move player
function movePlayer(e) {
    if (e.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.velocityX;
    } else if (e.key === "ArrowRight" && player.x + player.width < boardWidth) {
        player.x += player.velocityX;
    }

    // Keep ball on player paddle before game starts
    if (!isGameStarted) {
        ball.x = player.x + player.width / 2 - ball.width / 2;
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

// Create blocks
function createBlocks() {
    blocks = [];
    for (let r = 0; r < blockRows; r++) {
        for (let c = 0; c < blockColumns; c++) {
            blocks.push({
                x: 15 + c * (blockWidth + 10),
                y: 45 + r * (blockHeight + 10),
                width: blockWidth,
                height: blockHeight,
                break: false
            });
        }
    }
}

// End game
function endGame() {
    gameOver = true;
    document.getElementById("restartButton").style.display = "block";
}

// Reset positions and variables
function resetPositions() {
    player.x = boardWidth / 2 - player.width / 2;
    ball.x = player.x + player.width / 2 - ball.width / 2;
    ball.y = player.y - ball.height;
    ball.velocityX = 0;
    ball.velocityY = 0;
    isGameStarted = false;
    gameOver = false;
    score = 0;
    createBlocks();
    document.getElementById("restartButton").style.display = "none";
}

// Reset game on restart button click
function resetGame() {
    resetPositions();
    requestAnimationFrame(update);
}
