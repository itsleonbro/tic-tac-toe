import React, { createContext, useContext, useReducer, useEffect } from "react";

const GameContext = createContext();

const initialState = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
  gameOver: false,
  isDraw: false,
  scores: { X: 0, O: 0 },
  history: [],
};

function gameReducer(state, action) {
  switch (action.type) {
    case "MAKE_MOVE":
      if (state.board[action.index] || state.gameOver) {
        return state;
      }

      const newBoard = [...state.board];
      newBoard[action.index] = state.currentPlayer;

      const winner = calculateWinner(newBoard);
      const isDraw = !winner && newBoard.every(square => square !== null);

      // only update scores when game ends
      let newScores = { ...state.scores };
      if (winner) {
        newScores[winner] = state.scores[winner] + 1;
      }

      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        winner,
        gameOver: winner !== null || isDraw,
        isDraw,
        scores: newScores,
        history: [
          ...state.history,
          { board: newBoard, player: state.currentPlayer },
        ],
      };

    case "RESET_GAME":
      return {
        ...state,
        board: Array(9).fill(null),
        currentPlayer: "X",
        winner: null,
        gameOver: false,
        isDraw: false,
        history: [],
      };

    case "RESET_SCORES":
      return {
        ...state,
        scores: { X: 0, O: 0 },
      };

    default:
      return state;
  }
}

function calculateWinner(board) {
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
      return board[a];
    }
  }
  return null;
}

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const savedScores = localStorage.getItem("tictactoe-scores");
    if (savedScores) {
      const parsedScores = JSON.parse(savedScores);
      dispatch({
        type: "RESET_SCORES",
        scores: parsedScores,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tictactoe-scores", JSON.stringify(state.scores));
  }, [state.scores]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
