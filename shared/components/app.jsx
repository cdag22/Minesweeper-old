import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Board from './board.jsx';
import Menu from './menu.jsx';
import GameOverModal from './gameOverModal.jsx';
import helpers from '../../helpers/helpers.js';

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
    this.handleFlagSquare = this.handleFlagSquare.bind(this);
    this.handleBoardReset = this.handleBoardReset.bind(this);
  }

  componentDidMount() {
    //
    // INTIALIZE BOARD SIZE 3 x 3 ON LOAD
    //
    this.setState({
      board: helpers.buildBoard(9),
      selectedSquares: Array.from({ length: 9 }, (x, i) => 0),
      bombCount: 3
    })
  }

  handleBoardSizeChange(index) {
    this.setState({
      boardSizeIndex: index,
      board: helpers.buildBoard(this.state.boardSizes[index]),
      selectedSquares: Array.from({ length: this.state.boardSizes[index] }, (x, i) => 0),
      bombCount: Math.sqrt(this.state.boardSizes[index]),
    });
  }

  handleSquareClick(event) {
    event.preventDefault();
    let index = event.target.dataset.sqindex;

    //
    // LEFT CLICK => CALCULATE IF BOMB
    //
    this.setState(state => {
      let selected = state.selectedSquares;
      if (state.board[index] && (/[B0-9]/).test(state.board[index].value) && selected[index] !== 2) {
        if (state.board[index].value === 0) {
          let indicies = helpers.findAllZeroes(state.board, index);
          for (let i of indicies) {
            selected[i] = 1;
          }
        } else {
          selected[index] = 1;
        }
        let hasWon = selected.filter(bool => bool === 0).length === state.bombCount && !state.board[index].isBomb;
        let isGameOver = state.board[index].isBomb || hasWon;
        return {
          selectedSquares: selected,
          isGameOver: isGameOver,
          hasWon: hasWon,
        }
      } else {
        return {
          selectedSquares: selected,
        };
      }
    });
  }

  handleFlagSquare(event) {
    event.preventDefault();
    let index = event.target.dataset.sqindex;
    //
    // RIGHT CLICK => FLAG SQUARE
    //
    this.setState(state => {
      let selected = state.selectedSquares;
      if (selected[index] !== 0) {
        selected[index] = 0;
      } else {
        selected[index] = 2;
      }
      return {
        selectedSquares: selected,
      }
    });
  }

  handleBoardReset(wantsToPlayAgain) {
    if (wantsToPlayAgain) {
      this.setState({
        board: helpers.buildBoard(this.state.boardSizes[this.state.boardSizeIndex]),
        selectedSquares: Array.from({ length: this.state.boardSizes[this.state.boardSizeIndex] }, (x, i) => 0),
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
            selectedSquares={this.state.selectedSquares}
            size={this.state.boardSizes[this.state.boardSizeIndex]}
            flagSquare={this.handleFlagSquare}
            selectSquare={this.handleSquareClick}
          />
        </main>
      </div>
    );
  }
}

export default App;