import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Board from './board.jsx';
import Menu from './menu.jsx';
import GameOverModal from './gameOverModal.jsx';
import buildBoard from '../../helpers/helpers.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [],
      isGameOver: false,
      hasWon: false,
      boardSizes: [9, 25, 100],
      boardSizeIndex: 0,
      selectedSquares: [],
      bombCount: 0,
    };

    this.handleBoardSizeChange = this.handleBoardSizeChange.bind(this);
    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.handleBoardReset = this.handleBoardReset.bind(this);
  }

  componentDidMount() {
    this.setState({
      board: buildBoard(9),
      selectedSquares: Array.from({ length: 9 }, (x, i) => false),
      bombCount: 3
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.boardSizeIndex != this.state.boardSizeIndex) {
      this.setState({
        board: buildBoard(this.state.boardSizes[this.state.boardSizeIndex]),
        selectedSquares: Array.from({ length: this.state.boardSizes[this.state.boardSizeIndex] }, (x, i) => false),
        bombCount: Math.sqrt(this.state.boardSizes[this.state.boardSizeIndex]),
      });
    }
  }

  handleBoardSizeChange(index) {
    this.setState({
      boardSizeIndex: index,
    });
  }

  handleSquareClick(index) {
    this.setState(state => {
      let selected = state.selectedSquares;
      selected[index] = true;
      let hasWon = selected.filter(bool => !bool).length === state.bombCount;
      let isGameOver = state.board[index].isBomb || hasWon;

      return {
        selectedSquares: selected,
        isGameOver: isGameOver,
        hasWon: hasWon,
      }
    });
  }

  handleBoardReset(wantsToPlayAgain) {
    if (wantsToPlayAgain) {
      this.setState({
        board: buildBoard(this.state.boardSizes[this.state.boardSizeIndex]),
        selectedSquares: Array.from({ length: this.state.boardSizes[this.state.boardSizeIndex] }, (x, i) => false),
        isGameOver: false,
        hasWon: false,
      });
    } else {
      this.setState({
        isGameOver: false,
        hasWon: false,
      });
    }
  }

  render() {

    return (
      <div>
        <GameOverModal
          isGameOver={this.state.isGameOver}
          hasWon={this.state.hasWon}
          handleBoardReset={this.handleBoardReset}
        />
        <header className="header">
          <h1 className="header-title">MineSweeper</h1>
        </header>
        <main className="main-container">
          <Menu
            boardSize={this.state.boardSizes}
            index={this.state.boardSizeIndex}
            changeBoardSize={this.handleBoardSizeChange}
          />
          <hr />
          <Board
            board={this.state.board}
            size={this.state.boardSizes[this.state.boardSizeIndex]}
            selectSquare={this.handleSquareClick}
            selectedSquares={this.state.selectedSquares}
          />
        </main>
      </div>
    );
  }
}

export default App;