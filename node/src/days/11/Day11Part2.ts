import findBiggestSquare from "./findBiggestSquare";
import { Solve } from "../10/Day10Part1";

const solve: Solve = input => {
  const { topLeftPosition, size } = findBiggestSquare(
    1,
    300,
    parseInt(input, 10)
  );
  return `${topLeftPosition.x},${topLeftPosition.y},${size}`;
};

export default solve;
