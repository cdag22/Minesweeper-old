import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Board from './board.jsx';
import Menu from './menu.jsx';
import buildBoard from '../../helpers/helpers.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [],
      isGameOver: false,
      boardSizes: [9, 25, 100],
      boardSizeIndex: 0,
    };

    this.handleBoardSizeChange = this.handleBoardSizeChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      board: buildBoard(9)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.boardSizeIndex != this.state.boardSizeIndex) {
      this.setState({
        board: buildBoard(this.state.boardSizes[this.state.boardSizeIndex])
      });
    }
  }

  handleBoardSizeChange(index) {
    this.setState({
      boardSizeIndex: index,
    });
  }

  render() {

    return (
      <div>
        <header className="header">
          <h1 className="header-title">MineSweeper</h1>
        </header>
        <main className="main-container">
          <Menu
            boardSize={this.state.boardSizes}
            index={this.state.boardSizeIndex}
            changeBoardSize={this.handleBoardSizeChange}
          />
          <Board
            board={this.state.board}
            size={this.state.boardSizes[this.state.boardSizeIndex]}
          />
        </main>
      </div>
    );
  }
}

export default App;