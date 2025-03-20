import React from "react";
import styles from "./Board.module.css";
import Square from "../Square/Square";

const Board = ({ board, winningLine, onSquareClick }) => {
  // checks if a square is part of the winning line
  const isWinningSquare = index => {
    return winningLine && winningLine.includes(index);
  };

  return (
    <div className={styles.board}>
      {board.map((square, index) => (
        <Square
          key={index}
          value={square}
          winningSquare={isWinningSquare(index)}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
