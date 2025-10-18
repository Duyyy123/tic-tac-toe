import { useState, useEffect } from "react";
import { SquareValue, BotDifficulty } from "../types";
import { calculateWinner } from "../lib/gameLogic";

const getEasyMove = (squares: SquareValue[]) => {
  const availableSquares = squares
    .map((value, index) => (value === null ? index : null))
    .filter((val) => val !== null);
  const randomMove =
    availableSquares[Math.floor(Math.random() * availableSquares.length)];
  return { move: randomMove, positionsEvaluated: 0, thinkingTime: 0 };
};

const minimax = (
  board: SquareValue[],
  depth: number,
  isMaximizing: boolean,
): number => {
  const winner = calculateWinner(board)?.winner;
  if (winner === "O") return 10 - depth;
  if (winner === "X") return -10 + depth;
  if (winner === "Draw") return 0;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = "O";
        const evalScore = minimax(newBoard, depth + 1, false);
        maxEval = Math.max(maxEval, evalScore);
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const newBoard = [...board];
        newBoard[i] = "X";
        const evalScore = minimax(newBoard, depth + 1, true);
        minEval = Math.min(minEval, evalScore);
      }
    }
    return minEval;
  }
};

const getHardMove = (squares: SquareValue[]) => {
  const startTime = performance.now();
  let bestScore = -Infinity;
  let move: number | null = null;
  let positionsEvaluated = 0;

  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      const newBoard = [...squares];
      newBoard[i] = "O";
      const score = minimax(newBoard, 0, false);
      positionsEvaluated++;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  const endTime = performance.now();
  const thinkingTime = endTime - startTime;

  return { move, positionsEvaluated, thinkingTime };
};

export const useBot = (
  gameMode: string,
  botDifficulty: BotDifficulty,
  squares: SquareValue[],
  currentPlayer: "X" | "O",
  winner: SquareValue | "Draw",
  handleClick: (i: number) => void,
) => {
  const [isBotTurn, setIsBotTurn] = useState(false);
  const [thinkingTime, setThinkingTime] = useState(0.0);
  const [positionsEvaluated, setPositionsEvaluated] = useState(0);

  useEffect(() => {
    if (gameMode === "bot" && currentPlayer === "O" && !winner) {
      setIsBotTurn(true);
    }
  }, [gameMode, currentPlayer, winner, squares]);

  useEffect(() => {
    if (isBotTurn) {
      const getBestMove = () => {
        if (botDifficulty === "easy") {
          return getEasyMove(squares);
        } else if (botDifficulty === "hard") {
          return getHardMove(squares);
        }
        return { move: null, positionsEvaluated: 0, thinkingTime: 0 };
      };

      const { move, positionsEvaluated, thinkingTime } = getBestMove();
      if (move !== null) {
        setPositionsEvaluated(positionsEvaluated);
        setThinkingTime(thinkingTime);
        handleClick(move);
        setIsBotTurn(false);
      }
    }
  }, [isBotTurn, botDifficulty, squares, handleClick]);

  return { thinkingTime, positionsEvaluated };
};
