import findBiggestSquare from "./findBiggestSquare";

const solve = (input: string): string => {
  const { topLeftPosition, size } = findBiggestSquare(
    1,
    300,
    parseInt(input, 10)
  );
  return `${topLeftPosition.x},${topLeftPosition.y},${size}`;
};

export default solve;
