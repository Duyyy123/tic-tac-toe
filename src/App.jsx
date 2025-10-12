import Board from "./components/Board";
import GameInfo from "./components/GameInfo";
import "./App.css";
import { useTicTacToe } from "./hooks/useTicTacToe";
import ModeSelector from "./components/ModeSelector";

const App = () => {
  const {
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
  } = useTicTacToe();

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
