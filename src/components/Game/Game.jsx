import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Game.module.css";
import Board from "../Board/Board";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { useGameLogic } from "../../hooks/useGameLogic";
import { useModal } from "../../hooks/useModal";

const Game = () => {
  const navigate = useNavigate();
  const { isOpen, modalContent, openModal, closeModal } = useModal();
  const {
    board,
    currentPlayer,
    winner,
    isDraw,
    gameOver,
    scores,
    handleSquareClick,
    resetGame,
    resetScores,
  } = useGameLogic();

  // calculate winning line
  const calculateWinningLine = () => {
    if (!winner) return null;

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return lines[i];
      }
    }

    return null;
  };

  // show game result modal when game ends
  useEffect(() => {
    if (gameOver) {
      const content = (
        <div className={styles.resultModal}>
          {winner ? <h3>Player {winner} wins!</h3> : <h3>It's a draw!</h3>}

          <div className={styles.scoreDisplay}>
            <div>
              <span className={styles.playerX}>Player X:</span> {scores.X}
            </div>
            <div>
              <span className={styles.playerO}>Player O:</span> {scores.O}
            </div>
          </div>

          <div className={styles.modalActions}>
            <Button
              onClick={() => {
                resetGame();
                closeModal();
              }}
            >
              Play Again
            </Button>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      );

      openModal(content);
    }
  }, [
    gameOver,
    winner,
    isDraw,
    scores,
    resetGame,
    openModal,
    closeModal,
    navigate,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.gameInfo}>
        <div className={styles.scoreBoard}>
          <div className={`${styles.score} ${styles.playerX}`}>
            X: {scores.X}
          </div>
          <div className={`${styles.score} ${styles.playerO}`}>
            O: {scores.O}
          </div>
        </div>

        <div className={styles.turn}>
          {!gameOver && (
            <h2>
              Player{" "}
              <span className={styles[`player${currentPlayer}`]}>
                {currentPlayer}
              </span>
              's Turn
            </h2>
          )}
        </div>
      </div>

      <Board
        board={board}
        winningLine={calculateWinningLine()}
        onSquareClick={handleSquareClick}
      />

      <div className={styles.actions}>
        <Button onClick={resetGame}>New Game</Button>
        <Button variant="secondary" onClick={resetScores}>
          Reset Scores
        </Button>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default Game;
