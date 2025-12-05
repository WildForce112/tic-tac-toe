
(function () {
  const createPlayer = (name, marker, score = 0) => ({name, marker, score});

  let board = Array(9).fill('');
  let $board = null;
  let $player1 = null;
  let $player2 = null;
  let $players = null;
  let $resetBtn = null;

  const player1 = createPlayer('player1', 'X');
  const player2 = createPlayer('player2', 'O');
  let currentPlayer = player1.marker;

  const init = () => {
    $board = document.querySelector('.board');
    $player1 = document.querySelector('.player1');
    $player2 = document.querySelector('.player2');
    $players = document.querySelectorAll('.players');
    $resetBtn = document.querySelector('.resetBtn');

    handleMoves();
    handlePlayerEdit();
    handleReset();
  }

  const handleMoves = () => {
    $board.addEventListener('click', (e) => {
      const cell = e.target.closest('.cell');
      if(!cell) {
        return;
      }
      const idx = Number(cell.dataset.index);
      handlePlayerMove(idx);
    })
  }

  const handlePlayerEdit = () => {
    $players.forEach(player => {
      player.addEventListener('click', (e) => {
        const btn = e.target.closest('.editBtn');
        if(!btn) return;
        const $targetPlayer = player.querySelector('.player');
        const targetPlayer = $targetPlayer.classList.contains('player1') ? player1 : player2;
        const newName = prompt(`What's ${targetPlayer.name} new name?`);
        targetPlayer.name = newName.replaceAll(' ', '') === (null || '') ? targetPlayer.name : newName;
        reset();
      })
    })
  }

  const handleReset = () => {
    $resetBtn.addEventListener('click', () => {
      player1.score = 0;
      player2.score = 0;
      reset();
    })
  }

  const renderCell = (index, value) => {
    const $cell = document.createElement('div');
    $cell.className = 'cell';
    $cell.textContent = value === 'null' ? '' : value;
    $cell.dataset.index = index;
    return $cell;
  }

  const renderPlayer = (player, $player) => {
    $player.textContent = '';
    const $name = document.createElement('div');
    const $marker = document.createElement('div');
    const $score = document.createElement('div');
    $name.textContent = `Name: ${player.name}`;
    $marker.textContent = `Marker: ${player.marker}`;
    $score.textContent = `Score: ${player.score}`;
    $player.appendChild($name);
    $player.appendChild($marker);
    $player.appendChild($score);
  }

  const renderBoard = (boardArray) => {
    $board.innerHTML = ''; // clear old board;
    boardArray.forEach((value, index) => {
      const cell = renderCell(index, value);
      $board.appendChild(cell);
    });
    renderPlayer(player1, $player1);
    renderPlayer(player2, $player2);
  }

  const handlePlayerMove = (index) => {
    if (board[index]) return; // if cell already have a mark;

    board[index] = currentPlayer;
    renderBoard(board);

    const winner = checkWinner(board);
    if (winner) {
      setTimeout(() => alert(`${winner.name} wins!`), 0);
      winner === player1 ? player1.score++ : player2.score++;
      reset();
      return;
    }
    if (board.every(Boolean)) {
      setTimeout(() => alert(`It's a Draw!`), 0);
      reset();
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
      if(board[a] && board[a] == board[b] && board[a] == board[c]) return board[a] === player1.marker ? player1 : player2;
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