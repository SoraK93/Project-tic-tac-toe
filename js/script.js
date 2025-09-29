import { game } from "./game.js";

// initialize game state
let playerOneMark = "X";
let playerTwoMark = "O";
let tictactoe = game();

// create two users
const playerNames1 = localStorage.getItem("namePlayer1");
const playerNames2 = localStorage.getItem("namePlayer2");
console.log(playerNames1, playerNames2)
let users = tictactoe.createUser(playerNames1, playerNames2);
const { user1, user2 } = users;

// create a new gameboard at the start
let gameboard = tictactoe.start(users);

const DOMCache = (function () {
  let board = document.querySelector(".board");
  let playerOneScoreBoard = document.querySelector(".player1");
  let playerTwoScoreBoard = document.querySelector(".player2");
  let playerOneScoreValue = document.querySelector("#scoreP1");
  let playerTwoScoreValue = document.querySelector("#scoreP2");
  let gameResult = document.querySelector(".result");
  return {
    board,
    playerOneScoreBoard,
    playerTwoScoreBoard,
    playerOneScoreValue,
    playerTwoScoreValue,
    gameResult,
  };
})();

// Updates user name in the DOM
document.querySelector(".player1>div p").innerText = user1.name;
document.querySelector(".player2>div p").innerText = user2.name;

// Add a event listener to the board
DOMCache.board.addEventListener("click", playerTurn);

function playerTurn(e) {
  e.stopPropagation();
  // if box already clicked by a user, we just return
  if (e.target.classList.length !== 1) return;

  // Retrive data from board and use it to update matrix
  const boardBox = e.target;
  const index = boardBox.getAttribute("data-value");
  const outIndex = index.split("")[0];
  const inIndex = index.split("")[1];

  // Get current user and update marking, active user, and user score
  const currentUser = user1.getActiveStatus() ? user1 : user2;

  // Update gameboard
  tictactoe.marking(outIndex, inIndex, currentUser.mark, gameboard);

  // if no winner found change active user
  changeCurrentPlayer();

  updateCurrentPlayerDOM(boardBox, currentUser.mark);

  let playerActiveScoreBoard = [
    DOMCache.playerOneScoreBoard,
    DOMCache.playerTwoScoreBoard,
  ];
  updateActivePlayerDOM(playerActiveScoreBoard);

  // Checks if there is a winner in the round
  let roundScore = tictactoe.roundWinner(gameboard, currentUser.winRound);
  let winnerName = checkRoundWinner(currentUser, roundScore);

  // Check who is the winner in 3 rounds
  let checkWinner = tictactoe.winStatus(currentUser.getScore());
  if (checkWinner === "Win") {
    isWinner(winnerName);
    localStorage.removeItem("namePlayer1");
    localStorage.removeItem("namePlayer2");
    return;
  }

  // Resets the board after a round winner
  if (winnerName) {
    updateRoundWinnerDOM(winnerName, currentUser);
    return;
  }
}

/** This function takes care of all the player related UI feedback
 *  @param {Document} boxDOM
 *  @param {Number} currentPlayerMark
 */
function updateCurrentPlayerDOM(boxDOM, currentPlayerMark) {
  let cellSelect = currentPlayerMark === 1 ? "cellSelectP1" : "cellSelectP2";
  boxDOM.classList.add(cellSelect);

  let paragraphElement = document.createElement("p");
  paragraphElement.innerText = currentPlayerMark
    ? playerOneMark
    : playerTwoMark;
  boxDOM.appendChild(paragraphElement);
}

function updateActivePlayerDOM(scoreBoard) {
  scoreBoard[0].classList.toggle("activeP1"); // player1
  scoreBoard[1].classList.toggle("activeP2"); // player2
}

function updateScoreDOM(score, mark) {
  if (mark === 1) {
    DOMCache.playerOneScoreValue.innerText = `Score: ${score}`;
  } else {
    DOMCache.playerTwoScoreValue.innerText = `Score: ${score}`;
  }
}

function updateResultDOM(dom, winner) {
  let h3Element = document.createElement("h3");
  h3Element.textContent = `Winner of the round is ${winner}!`;
  dom.appendChild(h3Element);
  dom.classList.add("resultActive");
}

function updateRoundWinnerDOM(winner, user) {
  DOMCache.board.removeEventListener("click", playerTurn);
  updateResultDOM(DOMCache.gameResult, winner);
  updateScoreDOM(user.getScore(), user.mark);

  countDown(3);
  setTimeout(() => resetGame(DOMCache), 3000);
}

function checkRoundWinner(currentUser, score) {
  if (score === 3 || score === 0) {
    return currentUser.winner();
  }
}

function changeCurrentPlayer() {
  tictactoe.onEachRound(
    [user1.changeActiveStatus, user1.getActiveStatus],
    [user2.changeActiveStatus, user2.getActiveStatus]
  );
}

/** This function is used to reset all the UI elements and gameboard */
function resetGame() {
  // reset player active status
  gameboard = tictactoe.start(users);
  if (!DOMCache.playerOneScoreBoard.classList.contains("activeP1"))
    DOMCache.playerOneScoreBoard.classList.add("activeP1");
  DOMCache.playerTwoScoreBoard.classList.remove("activeP2");

  // reset gameboard box styles
  let boardCell = DOMCache.board.querySelectorAll(".boardCell");
  boardCell.forEach((element) => {
    element.classList.remove("cellSelectP1", "cellSelectP2");
    element.innerHTML = "";
  });

  // reset game result
  DOMCache.gameResult.innerHTML = "";
  DOMCache.gameResult.classList.remove("resultActive");

  // player can interact with the board again
  DOMCache.board.addEventListener("click", playerTurn);
}

function countDown(value) {
  let pElement = document.createElement("p");
  DOMCache.gameResult.appendChild(pElement);
  for (let i = value; i > 0; i--) {
    setTimeout(() => {
      pElement.textContent = `Next round will start in ${i}`;
    }, (value - i) * 1000);
  }
}

function isWinner(winner) {
  // Announce the Winner
  let h3Element = document.createElement("h3");
  h3Element.textContent = `Winner of the game is ${winner}!`;
  DOMCache.gameResult.appendChild(h3Element);
  DOMCache.gameResult.classList.add("resultActive");

  // Creates a button to reset the game
  let resetGame = document.createElement("button");
  resetGame.textContent = "Reset Game";
  DOMCache.gameResult.appendChild(resetGame);
  resetGame.classList.add("resetGameBtn");

  resetGame.addEventListener("click", () => {
    location.href = "./index.html";
  });

  // remove all user interaction from the gameboard
  DOMCache.board.removeEventListener("click", playerTurn);
}
