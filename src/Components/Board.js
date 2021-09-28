import React from "react";
import Square from "./Square"
const Board = (props) => {
    const renderSquare = (i) => {
      if(props.winner)
      {return (
        <Square
          value={props.squares[i]}
          winner ={(i===props.winner.a||i===props.winner.b||i===props.winner.c) ? true : null}
          onClick={() => props.onClick(i)}
        />
      );}
      else
      {
        return (
        <Square
          value={props.squares[i]}
          onClick={() => props.onClick(i)}
        />);
      }
    }
    return (
      <div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
  }
  export default Board;