import React, {useState} from "react";
import Board from "./Components/Board";
import "./App.css"
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {a: a, b:b, c:c, playerwin: squares[a]};
    }
  }
  return null;
}

const App = () => {
    const [chessState, updateState]= useState({
      history: [
        {
          squares: Array(9).fill(null),
          location:{x:null, y:null}
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      isOrder: false
    })
    const handleClick = (i) => {
      const history = chessState.history.slice(0, chessState.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const location = {x: parseInt((i)%3+1), y:parseInt((i)/3+1)};
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = chessState.xIsNext ? "X" : "O";
      updateState((prevState)=>{
        return{
        ...prevState,
        history: history.concat([
          {
            squares: squares,
            location: location
          }
        ]),
        stepNumber: history.length,
        xIsNext: !chessState.xIsNext}
      });
    }
  
    const jumpTo= (step) => {
      updateState((prevState) => {
        return{
          ...prevState,
          stepNumber: step,
          xIsNext: (step % 2) === 0}

      });
    }
    const modeReverse =()=>{
      updateState((prevState) => {
        return{
          ...prevState,
          isOrder: !chessState.isOrder}
      });
    }
    const history = chessState.history;
    const current = history[chessState.stepNumber];
    const winner = calculateWinner(current.squares);
    const historyArr = chessState.history.slice();
    if(chessState.isOrder)
    {
      historyArr.reverse();
    }
    const moves = historyArr.map((step, move) => {
      let desc = move ?
      'Go to move '.concat(`(${step.location.x}: ${step.location.y})`):
        'Go to game start';
        if(move===0 && chessState.isOrder)
        {
          desc='Go to move '.concat(`(${step.location.x}: ${step.location.y})`);
        }
      if(move===historyArr.length-1 && chessState.isOrder)
      {
        desc='Go to game start';
      }
      let stepTostep = move;
      if(chessState.isOrder)
      {
        stepTostep=historyArr.length-1-move;
      }
      return (
        <li key={stepTostep}>
          <button 
          className={stepTostep===chessState.stepNumber ? "bold-item" : null}
          onClick={() => jumpTo(stepTostep)}>{desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner.playerwin;
    } else {
      status = "Next player: " + (chessState.xIsNext ? "X" : "O");
    }
    console.log(current.squares.length)
    if(!winner && chessState.history.slice(0, chessState.stepNumber + 1).length===10 )
    {
      status="Draw";
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winner ={winner ? winner : null}
            onClick={i => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <button onClick={()=>{modeReverse()}}>Change Order</button>
      </div>
    );
  }

  export default App;