export function gameboard() {
  /** Create a empty gameboard of size 3 X 3 matrix */
  const createBoard = function () {
    // default values are undefined
    const board = new Array(3);
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(3);
    }
    return board;
  };

  // module for player1 input and player2 input

  return { createBoard };
}
