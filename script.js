document.addEventListener('DOMContentLoaded', () => {
    const rockPaperScissors = document.getElementById('rock-paper-scissors');
    const ticTacToe = document.getElementById('tic-tac-toe');
    const dinoGame = document.getElementById('dino');
    const snakeGame = document.getElementById('snake');
    const brickGame = document.getElementById('brick'); // Reference to the Brick game button

    // Event listeners for game navigations
    rockPaperScissors.addEventListener('click', () => {
        window.location.href = 'rps.html';
    });

    ticTacToe.addEventListener('click', () => {
        window.location.href = 'tictactoe.html';
    });

    dinoGame.addEventListener('click', () => {
        window.location.href = 'dino.html';
    });

    snakeGame.addEventListener('click', () => {
        window.location.href = 'snake.html';
    });

    brickGame.addEventListener('click', () => {
        window.location.href = 'brick.html'; // Navigate to the Brick game
    });
});
