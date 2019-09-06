import findBiggestSquare from "./findBiggestSquare";

const solve = (input: string): string => {
  const biggestSquare = findBiggestSquare(3, 3, parseInt(input, 10));
  return `${biggestSquare.topLeftPosition.x},${biggestSquare.topLeftPosition.y}`;
};

export default solve;
