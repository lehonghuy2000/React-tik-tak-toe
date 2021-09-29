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
    let square;
    let board=[];
    for(let i=0;i<9;i+=3)
    {
      square=[];
      for(let j=0;j<3;j++)
      {
        square.push(renderSquare(i+j));
      }
      board.push(
        <div className="board-row">
					{square}
				</div>
      )
    }
    return (
      <div>
        {board}
      </div>
    );
  }
  export default Board;