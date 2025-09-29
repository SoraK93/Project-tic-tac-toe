import { game } from "./game.js";

// initialize game state
let playerOneMark = "X";
let playerTwoMark = "O";
let tictactoe = game();

// create two users
// const playerX = window.prompt("Enter Player name:\n(Player will use X)");
// const playerY = window.prompt("Enter Player name:\n(Player will use Y)");
let users = tictactoe.createUser("Hola", "Mola");
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

document.querySelector(".player1>div p").innerText = user1.name;
document.querySelector(".player2>div p").innerText = user2.name;
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
  // Checks if there is a winner
  let roundScore = tictactoe.roundWinner(gameboard, currentUser.winRound);
  let winnerName = checkRoundWinner(currentUser, roundScore);
  // if no winner found change active user
  changeCurrentPlayer();

  updateCurrentPlayerDOM(boardBox, currentUser.mark);

  if (winnerName) {
    DOMCache.board.removeEventListener("click", playerTurn);
    updateResultDOM(DOMCache.gameResult, winnerName);
    updateScoreDOM(currentUser.getScore(), currentUser.mark, DOMCache);

    setTimeout(() => countDown(DOMCache, value), 1000);
    setTimeout(() => 2, 2000);
    setTimeout(() => 1, 3000);
    setTimeout(() => resetGame(DOMCache), 4000);
    return;
  }

  let playerActiveScoreBoard = [
    DOMCache.playerOneScoreBoard,
    DOMCache.playerTwoScoreBoard,
  ];
  updateActivePlayerDOM(playerActiveScoreBoard);
}

/** This function takes care of all the player related UI feedback
 *  @param {Document} boxDOM
 *  @param {Number} currentPlayerMark
 *  @param {Array} playerScoreBoard
 */
function updateCurrentPlayerDOM(boxDOM, currentPlayerMark, playerScoreBoard) {
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

function updateScoreDOM(score, mark, dom) {
  console.log(dom);
  if (mark === 1) {
    dom.playerOneScoreValue.innerText = `Score: ${score}`;
    console.log(dom.playerOneScoreValue);
  } else {
    dom.playerTwoScoreValue.innerText = `Score: ${score}`;
  }
}

function updateResultDOM(dom, winner) {
  let h3Element = document.createElement("h3");
  h3Element.textContent = `Winner of the round is ${winner}!`;
  dom.appendChild(h3Element);
  dom.classList.add("resultActive");
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

function resetGame(DOM) {
  gameboard = tictactoe.start(users);

  let boardCell = DOM.board.querySelectorAll(".boardCell");
  boardCell.forEach((element) => {
    element.classList.remove("cellSelectP1", "cellSelectP2");
    element.innerHTML = "";
  });

  DOM.gameResult.innerHTML = "";
  DOM.gameResult.classList.remove("resultActive");

  DOMCache.board.addEventListener("click", playerTurn);
}

function countDown(DOM, value) {}
