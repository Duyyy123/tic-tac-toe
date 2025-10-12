const GameInfo = ({
  currentPlayer,
  winner,
  xCount,
  oCount,
  dCount,
  handleRestartGame,
}) => {
  return (
    <div className="game-info">
      <div className="status">
        {winner
          ? winner == "Draw"
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
      <button className="reset-button" onClick={handleRestartGame}>
        Restart Game
      </button>
    </div>
  );
};

export default GameInfo;
