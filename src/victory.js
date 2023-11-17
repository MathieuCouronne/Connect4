document.addEventListener('DOMContentLoaded', function () {
  const winnerText = document.getElementById('winner');
  function checkDirection(col, row, colDirection, rowDirection, currentPlayer) {
    // Function to check direction right and left
    let count = 1;
    const maxCount = 4;

    let i = col + colDirection;
    let j = row + rowDirection;
    while (i >= 0 && i < 7 && j >= 0 && j < 6 && getCellValue(i, j) === currentPlayer) {
      count++;
      i += colDirection;
      j += rowDirection;
    }

    i = col - colDirection;
    j = row - rowDirection;
    while (i >= 0 && i < 7 && j >= 0 && j < 6 && getCellValue(i, j) === currentPlayer) {
      count++;
      i -= colDirection;
      j -= rowDirection;
    }

    return count >= maxCount;
  }

   window.checkVictory = function (col, row) {
    // Function to check victory
    if (![
      checkDirection(col, row, 1, 0, actualPlayer),
      checkDirection(col, row, 0, 1, actualPlayer),
      checkDirection(col, row, 1, 1, actualPlayer),
      checkDirection(col, row, 1, -1, actualPlayer)
    ].some((value) => value === true))
      return;
    victory = true;
    window.modal.style.display = 'flex';
    winnerText.textContent = `Player ${actualPlayer} won!`;
  }

});