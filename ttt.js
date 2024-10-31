
// let resultMessage = document.querySelector("#result-message");
// let gameContainer = document.querySelector(".container");

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// let gameOver = false;




// Handle box click
// boxes.forEach((box, index) => {
//     box.addEventListener("click", () => {
//         if (gameOver) return; // If game over, do nothing

//         box.innerText = turnO ? "O" : "X";
//         box.disabled = true;
//         turnO = !turnO;

//         checkWinner();
//     });
// });

// Check for a winner
// function checkWinner() {
//     for (let pattern of winPatterns) {
//         let [a, b, c] = pattern;
//         if (
//             boxes[a].innerText !== "" &&
//             boxes[a].innerText === boxes[b].innerText &&
//             boxes[b].innerText === boxes[c].innerText
//         ) {
//             declareWinner(boxes[a].innerText);
//             return;
//         }
//     }
//     checkDraw(); // If no winner, check for a draw
// }

// // Declare the winner
// function declareWinner(winner) {
//     gameOver = true;
//     gameContainer.classList.add("hidden"); // Hide the game
//     resultMessage.innerText = `Player ${winner} wins!`; // Show the result
//     resultMessage.style.color = "#28a745"; // Green color for winner
// }

// // Check if the game is a draw
// function checkDraw() {
//     let isDraw = true;
//     boxes.forEach(box => {
//         if (box.innerText === "") {
//             isDraw = false; // If any box is still empty, it's not a draw
//         }
//     });
//     if (isDraw) {
//         gameOver = true;
//         gameContainer.classList.add("hidden"); // Hide the game
//         resultMessage.innerText = "It's a draw!"; // Show the draw message
//         resultMessage.style.color = "#ffc107"; // Yellow color for draw
//     }
// }

// // Handle reset button click
// resetBtn.addEventListener("click", () => {
//     boxes.forEach(box => {
//         box.innerText = "";
//         box.disabled = false; // Re-enable all boxes
//     });
//     gameOver = false;
//     turnO = true;
//     resultMessage.innerText = ""; // Clear result message
//     gameContainer.classList.remove("hidden"); // Show the game again
// });
