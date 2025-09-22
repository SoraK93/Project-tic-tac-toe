import { player } from "./player.js";
import { gameboard } from "./gameboard.js";

/** Create a new game */
export function game(userModule = player, boardModule = gameboard) {
  // setting up initial setup
  const activeboard = boardModule();

  const createGameBoard = function (createBoard) {
    const myBoard = createBoard();
    return myBoard;
  };

  /** set playerX as active and create the gameboard */
  function start(user1) {
    user1.changeActiveStatus();
    const board = createGameBoard(activeboard.createBoard);
    return board;
  }

  let createUser = function (player1, player2) {
    let user1 = userModule(player1);
    user1["mark"] = 1;

    let user2 = userModule(player2);
    user2["mark"] = 0;
    return { user1, user2 };
  };

  function onEachRound(user1, user2) {
    changeActiveUser(user1, user2);
  }

  const marking = function(outIndex, inIndex, mark, board) {
    activeboard.updateBoard(outIndex, inIndex, mark, board);
  }

  /** Change Active Player */
  const changeActiveUser = function (user1, user2) {
    const [setUserOneStatus, getUserOneStatus] = user1;
    const [setUserTwoStatus, getUserTwoStatus] = user2;
    if ((getUserOneStatus())) {
      setUserOneStatus(); // turns user1 inactive
      setUserTwoStatus(); // turns user2 active
    } else if ((getUserTwoStatus())) {
      setUserOneStatus(); // turns user1 active
      setUserTwoStatus(); // turns user2 inactive
    }
  };

  function roundWinner() {}

  function winLose() {}

  return { start, createUser, onEachRound, marking };
}
