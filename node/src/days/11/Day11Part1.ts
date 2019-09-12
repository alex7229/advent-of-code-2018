import findBiggestSquare from "./findBiggestSquare";
import { Solve } from "../10/Day10Part1";

const solve: Solve = input => {
  const biggestSquare = findBiggestSquare(3, 3, parseInt(input, 10));
  return `${biggestSquare.topLeftPosition.x},${biggestSquare.topLeftPosition.y}`;
};

export default solve;
