import { Player } from "../types";

interface GameInfoProps {
  player: Player | null;
  status: string;
  handleRestartGame: () => void;
  gameId: string;
}

const GameInfo = ({ player, status, handleRestartGame, gameId }: GameInfoProps) => {
  return (
    <div className="game-info">
      <div className="status">
        {player ? `You are the ${player} player` : ""}
      </div>
      <div className="status">Status: {status}</div>
      <div className="status">Game ID: {gameId}</div>
      <button className="reset-button" onClick={handleRestartGame}>
        Restart Game
      </button>
    </div>
  );
};

export default GameInfo;