import { GameMode, BotDifficulty, SquareValue } from "../types";

interface GameInfoProps {
  mode: GameMode;
  difficulty: BotDifficulty;
  positionsEvaluated: number;
  thinkingTime: number;
  currentPlayer: "X" | "O";
  winner: SquareValue | "Draw";
  oCount: number;
  xCount: number;
  dCount: number;
  handleRestartGame: () => void;
}

const GameInfo = ({
  mode,
  difficulty,
  positionsEvaluated,
  thinkingTime,
  currentPlayer,
  winner,
  xCount,
  oCount,
  dCount,
  handleRestartGame,
}: GameInfoProps) => {
  return (
    <div className="game-info">
      <div className="status">
        {winner
          ? winner === "Draw"
            ? `Draw`
            : `Winner: ${winner}`
          : `Current Player: ${currentPlayer}`}
      </div>
      <div className="score">
        <div className="score-item">
          <span>X Wins:</span>
          <span>{xCount}</span>
        </div>
        <div className="score-item">
          <span>O Wins:</span>
          <span>{oCount}</span>
        </div>
        <div className="score-item">
          <span>Draws:</span>
          <span>{dCount}</span>
        </div>
      </div>
      {mode === "bot" && difficulty === "hard" && (
        <div className="performance-metrics">
          <h4 className="metrics-title">Performance Metrics</h4>
          <div className="metrics-content">
            <div className="metric-item">
              <span>Positions Evaluated:</span>
              <span className="metric-value">{positionsEvaluated || 0}</span>
            </div>
            <div className="metric-item">
              <span>Thinking Time:</span>
              <span className="metric-value">{thinkingTime?.toFixed(2) || 0} ms</span>
            </div>
          </div>
        </div>
      )}
      <button className="reset-button" onClick={handleRestartGame}>
        Restart Game
      </button>
    </div>
  );
};

export default GameInfo;