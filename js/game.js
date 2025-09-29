import { player } from "./player.js";
import { gameboard } from "./gameboard.js";

/** Start a new game */
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

  /** Takes in players name and create two new players for the game
   *  @param {String} player1
   *  @param {String} player2
   */
  let createUser = function (player1, player2) {
    let user1 = userModule(player1);
    user1["mark"] = 1;

    let user2 = userModule(player2);
    user2["mark"] = 0;
    return { user1, user2 };
  };

  /** Change who the active user is player1 or player2 on each round */
  function onEachRound(user1, user2) {
    changeActiveUser(user1, user2);
  }

  /** Updates the gameboard matrix array using
   *  @param {Number} outIndex
   *  @param {Number} inIndex
   *  @param {Number} mark
   *  @param {Array} board
   */
  const marking = function (outIndex, inIndex, mark, board) {
    activeboard.updateBoard(outIndex, inIndex, mark, board);
  };

  /** Change players active status */
  const changeActiveUser = function (user1, user2) {
    const [setUserOneStatus, getUserOneStatus] = user1;
    const [setUserTwoStatus, getUserTwoStatus] = user2;
    if (getUserOneStatus()) {
      setUserOneStatus(); // turns user1 inactive
      setUserTwoStatus(); // turns user2 active
    } else if (getUserTwoStatus()) {
      setUserOneStatus(); // turns user1 active
      setUserTwoStatus(); // turns user2 inactive
    }
  };

  function roundWinner() {}

  function winLose() {}

  return { start, createUser, onEachRound, marking };
}
