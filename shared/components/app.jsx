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
    this.handleBoardReset = this.handleBoardReset.bind(this);
  }

  //
  // INTIALIZE BOARD SIZE 3 x 3 ON LOAD
  //
  componentDidMount() {
    this.setState({
      board: helpers.buildBoard(9),
      selectedSquares: Array.from({ length: 9 }, (x, i) => false),
      bombCount: 3
    })
  }

  handleBoardSizeChange(index) {
    this.setState({
      boardSizeIndex: index,
      board: helpers.buildBoard(this.state.boardSizes[index]),
      selectedSquares: Array.from({ length: this.state.boardSizes[index] }, (x, i) => false),
      bombCount: Math.sqrt(this.state.boardSizes[index]),
    });
  }

  handleSquareClick(event) {
    event.preventDefault();

    //
    // RIGHT CLICK => FLAG SQUARE
    //
    if (event.type === 'contextmenu') {
      // TODO: FLAG SQUARE ON RIGHT CLICK
    } else {
      //
      // LEFT CLICK => CALCULATE IF BOMB
      //
      let index = event.target.dataset.sqindex;

      this.setState(state => {
        let selected = state.selectedSquares;
        if (state.board[index].value === 0) {
          let indicies = helpers.findAllZeroes(state.board, index);
          for (let i of indicies) {
            selected[i] = true;
          }
        } else {
          selected[index] = true;
        }
        let hasWon = selected.filter(bool => !bool).length === state.bombCount && !state.board[index].isBomb;
        let isGameOver = state.board[index].isBomb || hasWon;
        return {
          selectedSquares: selected,
          isGameOver: isGameOver,
          hasWon: hasWon,
        }
      });
    }
  }

  handleBoardReset(wantsToPlayAgain) {
    if (wantsToPlayAgain) {
      this.setState({
        board: helpers.buildBoard(this.state.boardSizes[this.state.boardSizeIndex]),
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