import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Button from "../Button/Button";
import { useModal } from "../../hooks/useModal";
import Modal from "../Modal/Modal";

const Home = () => {
  const navigate = useNavigate();
  const { isOpen, modalContent, openModal, closeModal } = useModal();

  const startGame = () => {
    navigate("/game");
  };

  const startGameFromModal = () => {
    closeModal();
    navigate("/game");
  };

  const showInstructions = () => {
    openModal(
      <div className={styles.instructions}>
        <h3>How to Play</h3>
        <p>Tic Tac Toe is a simple game played on a 3x3 grid.</p>
        <ol>
          <li>Players take turns placing their mark (X or O) on the grid.</li>
          <li>The first player is X, followed by O.</li>
          <li>
            The first player to get 3 of their marks in a row (horizontally,
            vertically, or diagonally) wins.
          </li>
          <li>If the grid is filled without a winner, the game is a draw.</li>
        </ol>
        <Button onClick={startGameFromModal} fullWidth>
          Start Playing Now
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Tic Tac Toe</h1>
        <p className={styles.subtitle}>The classic game of X's and O's</p>

        <div className={styles.actions}>
          <Button onClick={startGame} size="large" fullWidth>
            Start Game
          </Button>
          <Button
            onClick={showInstructions}
            variant="secondary"
            size="large"
            fullWidth
          >
            How to Play
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} title="Tic Tac Toe">
        {modalContent}
      </Modal>
    </div>
  );
};

export default Home;
