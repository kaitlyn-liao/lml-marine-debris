import React from 'react';
import '../src/App.css'

import Board from './board.js'

class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board/>
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
}
  
 export default Game
  