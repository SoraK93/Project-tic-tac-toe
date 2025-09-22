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

    return { board };
  })();

  DOMCache.board.addEventListener("click", (e) => {
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

    addPlayerMarkToDOM(boardBox, currentUser);
  });
});

function addPlayerMarkToDOM(parentDOM, currentPlayer) {
  let paragraphElement = document.createElement("p");
  paragraphElement.innerText = currentPlayer.mark
    ? playerOneMark
    : playerTwoMark;
  parentDOM.appendChild(paragraphElement);
}
