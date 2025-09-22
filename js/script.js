import { game } from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
  // initialize game state
  let tictactoe = game();

  // create two users
  const playerX = window.prompt("Enter Player name:\n(Player will use X)");
  const playerY = window.prompt("Enter Player name:\n(Player will use Y)");
  let users = tictactoe.createUser(playerX, playerY);

  // game start
  const gameboard = tictactoe.start(users);
  
});
