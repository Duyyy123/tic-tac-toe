import { SquareValue } from "../types";

interface SquareProps {
  value: SquareValue;
  isWinning: boolean;
  handleClick: () => void;
}

const Square = ({ value, isWinning, handleClick }: SquareProps) => {
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