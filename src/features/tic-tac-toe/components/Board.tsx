import { SquareValue } from "../types";
import Square from "./Square";

interface BoardProps {
  squares: SquareValue[];
  winningLine: number[] | null;
  handleClick: (i: number) => void;
}

const Board = ({ squares, winningLine, handleClick }: BoardProps) => {
  return (
    <div className="board">
      <div className="board-grid">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            isWinning={winningLine?.includes(index) ?? false}
            handleClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;