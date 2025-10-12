const Square = ({ value, isWinning, handleClick }) => {
  return (
    <button
      className={`square ${isWinning ? "square-winning" : ""}`}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

export default Square;
