
import { SquareValue } from "../types";

interface SquareProps {
  value: SquareValue;
  handleClick: () => void;
}

const Square = ({ value, handleClick }: SquareProps) => {
  return (
    <button
      className={`square`}
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

export default Square;
