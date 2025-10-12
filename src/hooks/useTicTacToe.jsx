import { useState, useEffect } from "react";
import { getBestMove } from "../Bot";

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const calculateWinner = (squares) => {
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  if (!squares.includes(null)) {
    return "Draw";
  }

  return null;
};

export const useTicTacToe = () => {
  const [gameMode, setGameMode] = useState("bot"); // "player" or "bot"
  const [botDifficulty, setBotDifficulty] = useState("easy"); // "easy" or "hard"
  const [isBotTurn, setIsBotTurn] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningLine, setWinLine] = useState(Array(3).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [oCount, setOCount] = useState(0);
  const [xCount, setXCount] = useState(0);
  const [dCount, setDCount] = useState(0);

  const handleGameModeChange = (mode) => {
    setGameMode(mode);
    setCurrentPlayer("X");
    setXIsNext(true);
    setIsBotTurn(false);
    setSquares(Array(9).fill(null));
    setWinner(null);
    setWinLine(Array(3).fill(null));
  };

  const handleDifficultyChange = (difficulty) => {
    setBotDifficulty(difficulty);
    setCurrentPlayer("X");
    setXIsNext(true);
    setIsBotTurn(false);
    setSquares(Array(9).fill(null));
    setWinner(null);
    setWinLine(Array(3).fill(null));
  };

  const handleRestartGame = () => {
    setSquares(Array(9).fill(null));
    setCurrentPlayer("X");
    setXIsNext(true);
    setIsBotTurn(false);
    setWinner(null);
    setWinLine(Array(3).fill(null));
  };

  const handleClick = (i) => {
    if (winner || squares[i]) {
      return;
    }

    const newSquares = [...squares];
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    setCurrentPlayer(xIsNext ? "O" : "X");

    if (gameMode === "bot") {
      setIsBotTurn(true);
    }
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    setWinner(winner);

    if (winner === "X") {
      setXCount((prev) => prev + 1);
    } else if (winner === "O") {
      setOCount((prev) => prev + 1);
    } else if (winner === "Draw") {
      setDCount((prev) => prev + 1);
    }
    if (winner) {
      for (const [a, b, c] of lines) {
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          setWinLine([a, b, c]);
        }
      }
      return;
    }
    if (isBotTurn) {
      const botMove = getBestMove(squares, botDifficulty);
      if (botMove !== undefined) {
        handleClick(botMove);
      }
      setIsBotTurn(false);
    }
  }, [squares, isBotTurn]);

  // useEffect(() => {
  // }, [winner, ]);

  return {
    gameMode,
    botDifficulty,
    currentPlayer,
    squares,
    winner,
    oCount,
    xCount,
    dCount,
    handleGameModeChange,
    handleDifficultyChange,
    handleRestartGame,
    handleClick,
    winningLine,
  };
};
