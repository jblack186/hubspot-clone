import React from 'react';
import Card from './Pages/Card';
import Board from './Pages/Board';

function Test () {

  return (
    <div>
        <Board id="board-1" className="board">
            <Card id="card-1" className="card" draggable="true">
              <p>Card one</p>
            </Card>
        </Board>
        <Board id="board-2" className="board">
            <Card id="card-2" className="card" draggable="true">
              <p>Card two</p>
            </Card>
        </Board>

    </div>
  )
}

export default Test;