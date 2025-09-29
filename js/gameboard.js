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

  /** module for player1 input and player2 input 
   *  @param {Number} outIndex
   *  @param {Number} inIndex
   *  @param {Number} mark
   *  @param {Array} board
  */
  const updateBoard = function (outIndex, inIndex, mark, board) {
    let box = board[outIndex][inIndex];
    if (box === undefined) {
      board[outIndex][inIndex] = mark;
    }
  };

  

  return { createBoard, updateBoard };
}
