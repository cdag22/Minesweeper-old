//---------------------------------------------------------------//
// BUILD BOMBS ARRAY
//---------------------------------------------------------------//
//
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
};

//---------------------------------------------------------------//
// DETERMINE NUMBER OF BOMBS NEARBY FOR EACH SQUARE
//---------------------------------------------------------------//
//
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

//---------------------------------------------------------------//
// BUILD BOARD
//---------------------------------------------------------------//
//
const buildBoard = n => {
  let bombs = buildBombs(n);
  let board = [];
  for (let i = 0; i < n; i++) {
    board.push({
      isBomb: bombs[i] === '1',
      value: 0
    });
  }

  board = calculateValues(partitionBoard(board, n));

  return board;
};

//================================================================

//---------------------------------------------------------------//
// FIND ALL CONTIGUOUS ZEROES IF CURRENT SQUARE CLICKED IS A ZERO
//---------------------------------------------------------------//
//
const findAllZeroes = function (board, index) {
  let b = [];
  let step = Math.sqrt(board.length);
  for (let i = 0; i < board.length; i += step) {
    b.push(board.slice(i, i + step));
  }
  let row = Math.floor(index / step);
  let col = index - (step * row);

  return findZeroes(b, row, col, step);
};


const findZeroes = function (board, row, col, step) {
  let indicies = {};

  (function walkBoard(board, row, col, step) {
    let rowStart = row - 1 >= 0 ? row - 1 : 0;
    let colStart = col - 1 >= 0 ? col - 1 : 0;
    let rowEnd = row - rowStart > 0 ? row + 3 > board.length ? board.length : row + 3 : row + 2;
    let colEnd = col - colStart > 0 ? col + 3 > board.length ? board.length : col + 3 : col + 2;

    for (let row = rowStart; row < rowStart + 3 && row < rowEnd; row++) {
      for (let col = colStart; col < colStart + 3 && col < colEnd; col++) {
        let i = step * row + col;
        if (board[row][col].value !== 'B' && !indicies.hasOwnProperty(i)) {
          indicies[i] = i;
          if (board[row][col].value === 0) {
            walkBoard(board, row, col, step);
          }
        }
      }
    }
  }(board, row, col, step))

  return Object.values(indicies);
};

//---------------------------------------------------------------//
// EXPORTS
//---------------------------------------------------------------//
//
module.exports = { buildBoard, findAllZeroes };