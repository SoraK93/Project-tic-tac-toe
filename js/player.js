/** Create player for the game */
export function player(name) {
  let score = 0;
  let activeStatus = false;

  /** Update player win score */
  function point() {
    return ++score;
  }

  /** Increment winner score */
  function winRound() {
    score = point();
    return score;
  }

  /** Get player score */
  function getScore() {
    return score;
  }

  /** Get player active status */
  function getActiveStatus() {
    return activeStatus;
  }

  /** Reverse player active status.
   * Change active user to inactive and vice-versa.
   */
  function changeActiveStatus() {
    activeStatus = !activeStatus;
    return activeStatus;
  }

  function winner() {
    return name;
  }

  return {
    name,
    getScore,
    winRound,
    getActiveStatus,
    changeActiveStatus,
    winner
  };
}
