import { Position } from "../10/parseLightPoints";
import generateGrid from "./generateGrid";
import findSquarePower from "./findSquarepower";

interface BiggestSquare {
  readonly topLeftPosition: Position;
  readonly size: number;
}

type FindBiggestSqaure = (
  minSquareSize: number,
  maxSquareSize: number,
  serialNumber: number
) => BiggestSquare;

const findBiggestSquare: FindBiggestSqaure = (
  minSquareSize,
  maxSquareSize,
  serialNumber
) => {
  const width = 300;
  const height = 300;
  const field = generateGrid(width, height, serialNumber);

  let maxPower = 0;
  let biggestSquare = {
    topLeftPosition: { x: 0, y: 0 },
    size: 1
  };
  for (
    let squareSize = minSquareSize;
    squareSize <= maxSquareSize;
    squareSize += 1
  ) {
    for (let row = 1; row <= height; row += 1) {
      for (let column = 1; column <= width; column += 1) {
        const totalPower = findSquarePower(
          { x: column, y: row },
          squareSize,
          field
        );
        if (totalPower > maxPower) {
          maxPower = totalPower;
          biggestSquare = {
            topLeftPosition: { x: column, y: row },
            size: squareSize
          };
        }
      }
    }
  }
  return biggestSquare;
};

export default findBiggestSquare;
