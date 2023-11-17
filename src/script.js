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
  window.modal = document.getElementById('modal');

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