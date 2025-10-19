const Home = () => {
  const goToGame = () => {
    window.location.href = "/game";
  };

  return (
    <div className="home-container">
      <h1>Odd/Even Tic-Tac-Toe</h1>
      <div className="menu">
        <button onClick={goToGame}>Play Online</button>
      </div>
    </div>
  );
};

export default Home;