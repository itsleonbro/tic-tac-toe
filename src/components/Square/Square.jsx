import React from "react";
import styles from "./Square.module.css";

const Square = ({ value, onClick, winningSquare = false }) => {
  const squareClass = `${styles.square} ${
    value ? styles[value.toLowerCase()] : ""
  } ${winningSquare ? styles.winning : ""}`;

  return (
    <button
      className={squareClass}
      onClick={onClick}
      aria-label={value ? `Square with ${value}` : "Empty square"}
      disabled={!!value}
    >
      {value}
    </button>
  );
};

export default Square;
