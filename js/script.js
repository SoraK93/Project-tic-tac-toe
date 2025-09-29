import { game } from "./game.js";

// initialize game state
let playerOneMark = "X";
let playerTwoMark = "O";
let tictactoe = game();

// create two users
// const playerX = window.prompt("Enter Player name:\n(Player will use X)");
// const playerY = window.prompt("Enter Player name:\n(Player will use Y)");
let users = tictactoe.createUser("playerX", "playerY");
const { user1, user2 } = users;

// game start
const gameboard = tictactoe.start(user1);

document.addEventListener("DOMContentLoaded", () => {
  const DOMCache = (function () {
    let board = document.querySelector(".board");
    let playerOneScoreBoard = document.querySelector(".player1");
    let playerTwoScoreBoard = document.querySelector(".player2");
    return { board, playerOneScoreBoard, playerTwoScoreBoard };
  })();

  DOMCache.board.addEventListener("click", (e) => playerTurn(e, DOMCache));
});


function playerTurn(e, DOMCache) {
  e.stopPropagation();

  const currentUser = user1.getActiveStatus() ? user1 : user2;

  const boardBox = e.target;
  const index = boardBox.getAttribute("data-value");
  const outIndex = index.split("")[0];
  const inIndex = index.split("")[1];

  tictactoe.marking(outIndex, inIndex, currentUser.mark, gameboard);
  tictactoe.onEachRound(
    [user1.changeActiveStatus, user1.getActiveStatus],
    [user2.changeActiveStatus, user2.getActiveStatus]
  );

  let playerActiveScoreBoard = [DOMCache.playerOneScoreBoard, DOMCache.playerTwoScoreBoard]
  updateCurrentPlayerDOM(boardBox, currentUser.mark, playerActiveScoreBoard);
  console.log(gameboard[2][2]);
}

/** This function takes care of all the player related UI feedback
 *  @param {Document} parentDOM
 *  @param {Number} currentPlayerMark
 *  @param {Array} playerScoreBoard
 */
function updateCurrentPlayerDOM(parentDOM, currentPlayerMark, playerScoreBoard) {
  let cellSelect = (currentPlayerMark === 1) ? "cellSelectP1" : "cellSelectP2";
  parentDOM.classList.add(cellSelect);

  let paragraphElement = document.createElement("p");
  paragraphElement.innerText = currentPlayerMark
    ? playerOneMark
    : playerTwoMark;
  parentDOM.appendChild(paragraphElement);

  playerScoreBoard[0].classList.toggle("activeP1"); // player1
  playerScoreBoard[1].classList.toggle("activeP2"); // player2
}
