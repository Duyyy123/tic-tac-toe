
import { useState, useEffect } from "react";
import { SquareValue, GameMode, BotDifficulty } from "../types";
import { calculateWinner } from "../lib/gameLogic";

export const useGame = () => {
  const [gameMode, setGameMode] = useState<GameMode>("bot");
  const [botDifficulty, setBotDifficulty] = useState<BotDifficulty>("easy");
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<SquareValue | "Draw">(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [xCount, setXCount] = useState(0);
  const [oCount, setOCount] = useState(0);
  const [dCount, setDCount] = useState(0);

  const handleGameModeChange = (mode: GameMode) => {
    setGameMode(mode);
    resetGame();
  };

  const handleDifficultyChange = (difficulty: BotDifficulty) => {
    setBotDifficulty(difficulty);
    resetGame();
  };

  const handleRestartGame = () => {
    resetGame();
  };

  const handleClick = (i: number) => {
    if (winner || squares[i]) {
      return;
    }

    const newSquares = [...squares];
    newSquares[i] = currentPlayer;
    setSquares(newSquares);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setWinningLine(null);
  };

  useEffect(() => {
    const result = calculateWinner(squares);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.winningLine);
      if (result.winner === "X") {
        setXCount((prev) => prev + 1);
      } else if (result.winner === "O") {
        setOCount((prev) => prev + 1);
      } else if (result.winner === "Draw") {
        setDCount((prev) => prev + 1);
      }
    }
  }, [squares]);

  return {
    gameMode,
    botDifficulty,
    currentPlayer,
    squares,
    winner,
    winningLine,
    xCount,
    oCount,
    dCount,
    handleGameModeChange,
    handleDifficultyChange,
    handleRestartGame,
    handleClick,
  };
};
