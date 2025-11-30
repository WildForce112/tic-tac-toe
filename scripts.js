(function () {
  let board = Array(9).fill('');
  let $board = null;
  let currentPlayer = 'X';

  const init = () => {
    $board = document.querySelector('.board');
    if (!$board) {
      console.error('.board element not found');
      return;
    }

    $board.addEventListener('click', (e) => {
      const cell = e.target.closest('.cell');
      if(!cell) return;
      const idx = Number(cell.dataset.index);
      handlePlayerMove(idx);
    })
  }

  const renderCell = (index, value) => {
    const $cell = document.createElement('div');
    $cell.className = 'cell';
    $cell.textContent = value === 'null' ? '' : value;
    $cell.dataset.index = index;
    return $cell;
  }

  const renderBoard = (boardArray) => {
    $board.innerHTML = ''; // clear old board;
    boardArray.forEach((value, index) => {
      const cell = renderCell(index, value);
      $board.appendChild(cell);
    });
  }

  const handlePlayerMove = (index) => {
    if (board[index]) return; // if cell already have a mark;

    board[index] = currentPlayer;
    renderBoard(board);

    const winner = checkWinner(board);
    if (winner) {
      setTimeout(() => alert(`${winner} wins!`), 0);
      // freeze further input
      return;
    }
    if (board.every(Boolean)) {
      setTimeout(() => alert(`Draw!`), 0);
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X' // change player; 
  }

  const checkWinner = (board) => {
    const lines = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ]
    for (const [a, b, c] of lines) {
      if(board[a] && board[a] == board[b] && board[a] == board[c]) return board[a];
    }
    return null;
  }

  const reset = () => {
    board = Array(9).fill('');
    currentPlayer = 'X';
    renderBoard(board);
  }
  init();
  renderBoard(board);
})()