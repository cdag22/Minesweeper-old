const calculateValue = (board, row, col) => {
  let rowStart = row - 1 >= 0 ? row - 1 : 0;
  let colStart = col - 1 >= 0 ? col - 1 : 0;
  let rowEnd = row - rowStart > 0 ? row + 3 > board.length ? board.length : row + 3 : row + 2;
  let colEnd = col - colStart > 0 ? col + 3 > board.length ? board.length : col + 3 : col + 2;

  for (let row = rowStart; row < rowStart + 3 && row < rowEnd; row++) {
    for (let col = colStart; col < colStart + 3 && col < colEnd; col++) {
      board[row][col].value += 1;
    }
  }
  return board;
};

const calculateValues = board => {
  for (let i = 0; i < board.length; i++) {
    for (let k = 0; k < board[0].length; k++) {
      if (board[i][k].isBomb) {
        board = calculateValue(board, i, k);
      }
    }
  }
  return board.reduce((acc, cur) => acc.concat(cur), []);
};

const partitionBoard = (board, n) => {
  let partitioned = [];
  let root = Math.sqrt(n);
  for (let i = 0; i < board.length; i += root) {
    partitioned.push(board.slice(i, i + root))
  }
  return partitioned;
};

const buildBombs = n => {
  let root = Math.sqrt(n)
  let bombs = ('1').repeat(root);
  let randomized = [];
  let getRandom = arr => arr.splice(Math.floor(Math.random() * arr.length), 1)[0];

  bombs = bombs.padStart(n, '0').split('')
  while (bombs.length) {
    randomized.push(getRandom(bombs));
  }
  return randomized;
}


const buildBoard = n => {
  let bombs = buildBombs(n);
  let board = [];
  for (let i = 0; i < n; i++) {
    board.push({
      isShowing: false,
      isBomb: bombs[i] === '1',
      value: 0
    });
  }

  // board = (partitionBoard(board, n));
  board = calculateValues(partitionBoard(board, n));

  return board;
};


// let board = buildBoard(9);
// console.log(board);

module.exports = buildBoard;