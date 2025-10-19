
import { useState } from "react";

const Home = () => {
  const [gameId, setGameId] = useState("");

  const createNewGame = () => {
    const newGameId = Math.random().toString(36).substring(2, 9);
    window.location.href = `/${newGameId}`;
  };

  const joinGame = () => {
    if (gameId) {
      window.location.href = `/${gameId}`;
    }
  };

  return (
    <div className="home-container">
      <h1>Odd/Even Tic-Tac-Toe</h1>
      <div className="menu">
        <button onClick={createNewGame}>Create New Game</button>
        <div className="join-game">
          <input
            type="text"
            placeholder="Enter Game ID"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
          />
          <button onClick={joinGame}>Join Game</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
