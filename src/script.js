const attributeName = 'data-player';
const Player  = {
  ONE: 'one',
  TWO: 'two',
};
let victory = false;
let actualPlayer = Player.ONE;


document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('grid-container');
  const restart = document.getElementById('restart');
  const modal = document.getElementById('modal');
  const winnerText = document.getElementById('winner');

  restart.addEventListener('click', function () {
    // Function to restart the game
    victory = false;
    actualPlayer = Player.ONE;
    modal.style.display = 'none';
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        const cell = document.getElementById(`cell-${col}-${row}`);
        // cell.textContent = '';
        cell.removeAttribute(attributeName);
      }
    }
  });

  function getCellValue(col, row) {
    // Function to get cell value to check victory
    const cell = document.getElementById(`cell-${col}-${row}`);

    return cell.getAttribute(attributeName);
  }

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
  function checkVictory(col, row) {
    // Function to check victory
    if (![
      checkDirection(col, row, 1, 0, actualPlayer),
      checkDirection(col, row, 0, 1, actualPlayer),
      checkDirection(col, row, 1, 1, actualPlayer),
      checkDirection(col, row, 1, -1, actualPlayer)
    ].some((value) => value === true))
      return;
    victory = true;
    modal.style.display = 'flex';
    winnerText.textContent = `Player ${actualPlayer} won!`;
  }

  function handleClick(cell, col, row) {
    if (cell.hasAttribute(attributeName))
      return;

    switch (actualPlayer) {
      case Player.ONE:
        cell.setAttribute(attributeName, Player.ONE);
        checkVictory(col, row);
        actualPlayer = Player.TWO;
        break;
      case Player.TWO:
        cell.setAttribute(attributeName, Player.TWO);
        checkVictory(col, row);
        actualPlayer = Player.ONE;
        break;
      default:
        return;
    }
  }

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      const cell = document.createElement('div');
      cell.id = `cell-${col}-${row}`;
      cell.className = 'cell';
      cell.addEventListener('click', function () {
        handleClick(cell, col, row);
      });
      grid.appendChild(cell);
    }
  }
});