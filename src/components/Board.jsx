import Square from "./Square";

const Board = ({ squares, winningLine, handleClick }) => {
  return (
    <div className="board">
      <div className="board-grid">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            isWinning={winningLine && winningLine.includes(index)}
            handleClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
