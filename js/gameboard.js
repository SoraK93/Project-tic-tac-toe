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

  /** Traverse through the board matrix checking all combinations
   *  to see if the current user is the winner of the round
   *  @param {Array} boardArray
   *  @param {String} checkDirection - "vertical" / "horizontal" / "diagonal"
   */
  function traverseBoardArray(boardArray, checkDirection) {
    let total;

    // Horizontal Check
    if (checkDirection == "horizontal") {
      for (let i = 0; i < boardArray.length; i++) {
        total = boardArray[i][0] + boardArray[i][1] + boardArray[i][2];
        if (total === 3 || total === 0) return total;
      }
    }

    // Vertical Check
    if (checkDirection == "vertical") {
      for (let i = 0; i < boardArray.length; i++) {
        total = boardArray[0][i] + boardArray[1][i] + boardArray[2][i];
        if (total === 3 || total === 0) return total;
      }
    }

    // Diagonal Check
    if (checkDirection == "diagonal") {
      // left diagonal (\)
      total = boardArray[0][0] + boardArray[1][1] + boardArray[2][2];
      if (total === 3 || total === 0) return total;
      // right diagonal (/)
      total = boardArray[0][2] + boardArray[1][1] + boardArray[2][0];
      if (total === 3 || total === 0) return total;
    }

    return total;
  }

  return { createBoard, updateBoard, traverseBoardArray };
}
