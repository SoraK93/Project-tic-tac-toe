import { player } from "./player.js";
import { gameboard } from "./gameboard.js";

/** Create a new game */
export function game(userModule=player, boardModule=gameboard) {
  // setting up initial setup
  const createGameBoard = function () {
    const activeboard = boardModule();
    const myBoard = activeboard.board;
    return myBoard;
  };

  /** set playerX as active and create the gameboard */
  function start(players) {
    let { user1, _ } = players;
    user1.changeActiveStatus();
    const board = createGameBoard();
    return board;
  }

  let createUser = function (player1, player2) {
    let user1 = userModule(player1);
    user1["mark"] = 1;

    let user2 = userModule(player2);
    user2["mark"] = 0;
    return { user1, user2 };
  };

  function onEachRound(players) {
    let { user1, user2 } = players;
    changeActiveUser(user1, user2);
    
  }

  /** Change Active Player */
  const changeActiveUser = function (user1, user2) {
    if (user1.getActiveStatus) {
      user1.changeActiveStatus(); // turns user1 inactive
      user2.changeActiveStatus(); // turns user2 active
    } else if (user2.getActiveStatus) {
      user1.changeActiveStatus(); // turns user1 active
      user2.changeActiveStatus(); // turns user2 inactive
    }
  };

  function roundWinner() {}

  function winLose() {}

  return { start, createUser };
}
