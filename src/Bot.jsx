const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export const calculateWinner = (squares) => {
  for (const [a, b, c] of winLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  if (!squares.includes(null)) {
    return "Draw";
  }
  return null;
};
const getEasyMove = (squares) => {
  // Implement easy bot logic here
  console.log("Easy bot move");
  const availableSquares = squares
    .map((value, index) => (value === null ? index : null))
    .filter((val) => val !== null);
  const randomMove =
    availableSquares[Math.floor(Math.random() * availableSquares.length)];
  return randomMove;
};

const minimax = (board, depth, isMaximizing) => {
  const winner = calculateWinner(board);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return -10 + depth;
  if (winner === "Draw") return 0;

  if (isMaximizing) {
    // AI turn
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
    // Player turn
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

const getHardMove = (squares) => {
  // Implement hard bot logic here
  console.log("Hard bot move");
  let bestScore = -Infinity;
  let move = null;

  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      // only consider empty cells
      const newBoard = [...squares];
      newBoard[i] = "O"; // simulate AI move
      const score = minimax(newBoard, 0, false); // next turn is player
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move; // return the best index for AI to play
};

export const getBestMove = (squares, difficulty) => {
  if (difficulty === "easy") {
    return getEasyMove(squares);
  } else if (difficulty === "hard") {
    return getHardMove(squares);
  }
};
