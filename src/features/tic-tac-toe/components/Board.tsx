
import { SquareValue } from "../types";
import Square from "./Square";

interface BoardProps {
  squares: SquareValue[];
  handleClick: (i: number) => void;
}

const Board = ({ squares, handleClick }: BoardProps) => {
  return (
    <div className="board">
      <div className="board-grid">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            handleClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
