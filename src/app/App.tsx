import Home from "./Home";
import Game from "./Game";
import { getOrSetPlayerId } from "../shared/lib/utils";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    getOrSetPlayerId();
  }, []);

  const path = window.location.pathname;
  const gameId = path.substring(1);

  if (gameId) {
    return <Game gameId={gameId} />;
  }

  return <Home />;
};

export default App;