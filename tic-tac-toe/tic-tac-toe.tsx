import react, { useState } from "react";
export const TictacToe = () => {
  const [next, setNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const possibleWinsSpots = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWin = (squares: any[]) => {
    for (let i = 0; i < possibleWinsSpots.length; i++) {
      const [a, b, c] = possibleWinsSpots[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    // If there is a winner or the is a value for that sqaure we're not doing anything
    if (calculateWin(squares) || squares[i]) {
      return;
    }

    // switch number to O or X
    const newSquare = [...squares];
    if (next) {
      newSquare[i] = "X";
    } else {
      newSquare[i] = "O";
    }
    setSquares(newSquare);
    setNext(!next);
  };
  const handleReset = () => setSquares(Array(9).fill(null));
  const result = calculateWin(squares);
  const nextTurn = "Player " + (next ? "x" : "o") + " turns";
  const decision = result ? `Player ${result} wins` : nextTurn;

  return (
    <div className="game-board">
      <div>{decision} </div>
      <div className="board-row">
        <button className="square" onClick={() => handleClick(0)}>
          {squares[0]}
        </button>
        <button className="square" onClick={() => handleClick(1)}>
          {squares[1]}
        </button>
        <button className="square" onClick={() => handleClick(2)}>
          {squares[2]}
        </button>
      </div>
      <div className="board-row">
        <button className="square" onClick={() => handleClick(3)}>
          {squares[3]}
        </button>
        <button className="square" onClick={() => handleClick(4)}>
          {" "}
          {squares[4]}
        </button>
        <button className="square" onClick={() => handleClick(5)}>
          {squares[5]}{" "}
        </button>
      </div>
      <div className="board-row">
        <button className="square" onClick={() => handleClick(6)}>
          {squares[6]}{" "}
        </button>
        <button className="square" onClick={() => handleClick(7)}>
          {squares[7]}{" "}
        </button>
        <button className="square" onClick={() => handleClick(8)}>
          {" "}
          {squares[8]}
        </button>
      </div>
      <div>
        {" "}
        <button onClick={() => handleReset()}>Reset </button>{" "}
      </div>
    </div>
  );
}