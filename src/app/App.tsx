import Home from "./Home";
import Game from "./Game";

const App = () => {
  const path = window.location.pathname;

  if (path === "/game") {
    return <Game />;
  }

  return <Home />;
};

export default App;