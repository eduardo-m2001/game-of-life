var boardSize = 10;
var board = [];
var intervalId;

function initializeBoard() {
  var boardElement = document.getElementById('board');
  boardElement.innerHTML = '';

  for (var i = 0; i < boardSize; i++) {
    board[i] = [];
    for (var j = 0; j < boardSize; j++) {
      var cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = i.toString();
      cell.dataset.col = j.toString();
      board[i][j] = false;
      boardElement.appendChild(cell);
    }
  }

  boardElement.addEventListener('click', toggleCellState);

  var startButton = document.getElementById('startButton');
  var stopButton = document.getElementById('stopButton');
  startButton.addEventListener('click', startGame);
  stopButton.addEventListener('click', stopGame);
}

function toggleCellState(event) {
  var cell = event.target;
  var row = parseInt(cell.dataset.row);
  var col = parseInt(cell.dataset.col);
  board[row][col] = !board[row][col];
  cell.style.backgroundColor = board[row][col] ? '#000' : '#fff';
}

function updateBoard() {
  var newBoard = [];
  for (var i = 0; i < boardSize; i++) {
    newBoard[i] = [];
    for (var j = 0; j < boardSize; j++) {
      var liveNeighbors = countLiveNeighbors(i, j);
      if (board[i][j] && (liveNeighbors === 2 || liveNeighbors === 3)) {
        newBoard[i][j] = true;
      } else if (!board[i][j] && liveNeighbors === 3) {
        newBoard[i][j] = true;
      } else {
        newBoard[i][j] = false;
      }
    }
  }
  board = newBoard;

  var cells = document.getElementsByClassName('cell');
  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      var cellIndex = i * boardSize + j;
      cells[cellIndex].style.backgroundColor = board[i][j] ? '#000' : '#fff';
    }
  }
}

function countLiveNeighbors(row, col) {
  var count = 0;
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; 
      var neighborRow = (row + i + boardSize) % boardSize;
      var neighborCol = (col + j + boardSize) % boardSize;
      if (board[neighborRow][neighborCol]) count++;
    }
  }
  return count;
}

function startGame() {
  document.getElementById('startButton').disabled = true;

  board = [];
  for (var i = 0; i < boardSize; i++) {
    board[i] = [];
    for (var j = 0; j < boardSize; j++) {
      board[i][j] = false;
    }
  }

  var cells = document.getElementsByClassName('cell');
  for (var i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = '#fff';
  }

  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      if (Math.random() < 0.5) {
        board[i][j] = true;
        var cellIndex = i * boardSize + j;
        cells[cellIndex].style.backgroundColor = '#000';
      }
    }
  }

  intervalId = setInterval(updateBoard, 500); 
}

function stopGame() {
  document.getElementById('startButton').disabled = false;

  clearInterval(intervalId);
}

window.addEventListener('load', initializeBoard);