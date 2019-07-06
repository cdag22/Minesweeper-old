import React from 'react';

const GameOverModal = ({ isGameOver, hasWon, handleBoardReset }) => {

  return isGameOver ? (
    <div className="modal">
      <header className="modal-header">
        <h1 className="modal-header-title">Game Over</h1>
        <h2 className="modal-header-subtitle">{hasWon ? 'Congratulations you win!' : 'Sorry you lose'}</h2>
      </header>
      <hr />
      <main className="modal-body">
        <h2 className="modal-header-subtitle">Play Again?</h2>
        <div className="modal-buttons">
          <button
            className="btn yes-btn"
            onClick={() => handleBoardReset(true)}
          >
            Yes
          </button>
          <button
            className="btn no-btn"
            onClick={() => handleBoardReset(false)}
          >
            No
          </button>
        </div>
      </main>
    </div>
  ) : null;
};

export default GameOverModal;