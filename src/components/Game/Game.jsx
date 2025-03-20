import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Game.module.css";
import Board from "../Board/Board";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import ScoreCounter from "../ScoreCounter/ScoreCounter";
import { useGameLogic } from "../../hooks/useGameLogic";

const Game = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

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

  // open modal when game ends
  useEffect(() => {
    if (gameOver) {
      setModalOpen(true);
    }
  }, [gameOver]);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePlayAgain = () => {
    closeModal();
    resetGame();
  };

  const handleBackToHome = () => {
    closeModal();
    navigate("/");
  };

  const renderModalContent = () => (
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
        <Button onClick={handlePlayAgain}>Play Again</Button>
        <Button variant="secondary" onClick={handleBackToHome}>
          Back to Home
        </Button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.gameInfo}>
        <ScoreCounter scores={scores} />

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

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={winner ? `Player ${winner} wins!` : "It's a draw!"}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Game;
