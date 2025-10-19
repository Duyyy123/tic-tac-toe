
import Board from "../features/tic-tac-toe/components/Board";
import GameInfo from "../features/tic-tac-toe/components/GameInfo";
import { useGame } from "../features/tic-tac-toe/hooks/useGame";
import "../styles/globals.css";

interface GameProps {
  gameId: string;
}

const Game = ({ gameId }: GameProps) => {
  const { player, board, status, winner, handleClick, handleRestart } = useGame(gameId);

  return (
    <div className="game-container">
      <h1 className="game-title">Odd/Even Tic-Tac-Toe</h1>
      <div className="game-content">
        <Board squares={board} handleClick={handleClick} />
        <GameInfo player={player} status={status} handleRestartGame={handleRestart} gameId={gameId} />
      </div>
      {winner && (
        <div className="game-over-overlay">
          <div className="game-over-message">
            <h2>Game Over</h2>
            <p>{winner} wins!</p>
            <button onClick={handleRestart}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
