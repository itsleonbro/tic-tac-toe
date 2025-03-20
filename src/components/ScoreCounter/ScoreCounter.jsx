import React, { useEffect, useState } from "react";
import styles from "./ScoreCounter.module.css";

const ScoreCounter = ({ scores }) => {
  const [prevScores, setPrevScores] = useState({ X: scores.X, O: scores.O });
  const [animated, setAnimated] = useState({ X: false, O: false });

  // detect score changes and trigger animations
  useEffect(() => {
    if (scores.X > prevScores.X) {
      setAnimated({ ...animated, X: true });
      setTimeout(() => setAnimated(prev => ({ ...prev, X: false })), 2000);
    } else if (scores.O > prevScores.O) {
      setAnimated({ ...animated, O: true });
      setTimeout(() => setAnimated(prev => ({ ...prev, O: false })), 2000);
    }

    setPrevScores(scores);
  }, [scores]);

  const renderDigits = (value, player) => {
    return value
      .toString()
      .split("")
      .map((digit, index) => (
        <div
          key={`${player}-${index}`}
          className={`${styles.digit} ${animated[player] ? styles.pulse : ""}`}
        >
          {digit}
        </div>
      ));
  };

  return (
    <div className={styles.scoreContainer}>
      <div className={styles.scoreCard}>
        <div
          className={`${styles.playerBadge} ${styles.playerXBadge} ${
            animated.X ? styles.winAnimation : ""
          }`}
        >
          <div className={styles.playerIcon}>X</div>
          <div className={styles.label}>Player X</div>
        </div>

        <div className={styles.scoreDisplay}>
          <div
            className={`${styles.digitContainer} ${styles.xDigits} ${
              animated.X ? styles.shake : ""
            }`}
          >
            {renderDigits(scores.X, "X")}
          </div>
        </div>
      </div>

      <div className={styles.vsContainer}>
        <div className={styles.vsCircle}>VS</div>
      </div>

      <div className={styles.scoreCard}>
        <div
          className={`${styles.playerBadge} ${styles.playerOBadge} ${
            animated.O ? styles.winAnimation : ""
          }`}
        >
          <div className={styles.playerIcon}>O</div>
          <div className={styles.label}>Player O</div>
        </div>

        <div className={styles.scoreDisplay}>
          <div
            className={`${styles.digitContainer} ${styles.oDigits} ${
              animated.O ? styles.shake : ""
            }`}
          >
            {renderDigits(scores.O, "O")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCounter;
