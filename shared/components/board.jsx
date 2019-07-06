import React from 'react';

const Board = ({ board, size }) => {

  let root = Math.sqrt(size);
  let sqSize = size === 9 ? 60 : size === 25 ? 40 : 25;
  let fontSize = size === 9 ? 26 : size === 25 ? 18 : 16;
  let boardWidth = root * sqSize + 2 * root;

  return (
    <div className="board" style={{ 'width': `${boardWidth}px` }}>
      {board.map((square, i) => (
        <div
          key={i}
          className="square"
          style={{ 'width': `${sqSize}px`, 'height': `${sqSize}px`, 'fontSize': `${fontSize}px` }}
        >
          {square.isBomb ? 'B' : square.value}
        </div>
      ))}
    </div>
  );
};

export default Board;