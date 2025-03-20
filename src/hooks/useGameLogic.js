import { useEffect } from "react";
import { useGame } from "../contexts/GameContext";
import { useSound } from "./useSound";

export function useGameLogic() {
  const { state, dispatch } = useGame();
  const { playClick, playWin, playDraw } = useSound();

  const handleSquareClick = index => {
    // dont process click if square is filled or game is over
    if (state.board[index] || state.gameOver) {
      return;
    }

    playClick();
    dispatch({ type: "MAKE_MOVE", index });
  };

  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
  };

  const resetScores = () => {
    dispatch({ type: "RESET_SCORES" });
  };

  useEffect(() => {
    if (state.winner) {
      playWin();
    } else if (state.isDraw) {
      playDraw();
    }
  }, [state.gameOver, state.winner, state.isDraw, playWin, playDraw]);

  return {
    ...state,
    handleSquareClick,
    resetGame,
    resetScores,
  };
}
