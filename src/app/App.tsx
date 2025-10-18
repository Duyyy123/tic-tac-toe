import Board from "../features/tic-tac-toe/components/Board";
import GameInfo from "../features/tic-tac-toe/components/GameInfo";
import ModeSelector from "../features/tic-tac-toe/components/ModeSelector";
import { useGame } from "../features/tic-tac-toe/hooks/useGame";
import { useBot } from "../features/tic-tac-toe/hooks/useBot";
import "../styles/globals.css";

const App = () => {
  const {
    gameMode,
    botDifficulty,
    currentPlayer,
    squares,
    winner,
    winningLine,
    oCount,
    xCount,
    dCount,
    handleGameModeChange,
    handleDifficultyChange,
    handleRestartGame,
    handleClick,
  } = useGame();

  const { thinkingTime, positionsEvaluated } = useBot(
    gameMode,
    botDifficulty,
    squares,
    currentPlayer,
    winner,
    handleClick
  );

  return (
    <div className="game-container">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="game-content">
        <Board
          squares={squares}
          winningLine={winningLine}
          handleClick={handleClick}
        />
        <div className="game-sidebar">
          <ModeSelector
            mode={gameMode}
            difficulty={botDifficulty}
            onModeChange={handleGameModeChange}
            onDifficultyChange={handleDifficultyChange}
          />
          <GameInfo
            mode={gameMode}
            difficulty={botDifficulty}
            positionsEvaluated={positionsEvaluated}
            thinkingTime={thinkingTime}
            currentPlayer={currentPlayer}
            winner={winner}
            oCount={oCount}
            xCount={xCount}
            dCount={dCount}
            handleRestartGame={handleRestartGame}
          />
        </div>
      </div>
    </div>
  );
};

export default App;