import { Position } from "../10/parseLightPoints";

type FindSquarePower = (
  topLeftCellPosition: Position,
  squareSize: number,
  field: ReadonlyArray<ReadonlyArray<number>>
) => number;

const findSquarePower: FindSquarePower = (
  topLeftCellPosition,
  squareSize,
  field
) => {
  const fieldSize = field.length;
  // -1 is used because 1 by 1 field is one cell
  // bottom right cell will be the same as top left cell
  const bottomRightCellPosition = {
    x: topLeftCellPosition.x + squareSize - 1,
    y: topLeftCellPosition.y + squareSize - 1
  };
  // if square is out of bound, return 0
  if (
    bottomRightCellPosition.x > fieldSize ||
    bottomRightCellPosition.y > fieldSize
  ) {
    return 0;
  }
  let totalPower = 0;
  for (
    let row = topLeftCellPosition.y;
    row <= bottomRightCellPosition.y;
    row += 1
  ) {
    for (
      let column = topLeftCellPosition.x;
      column <= bottomRightCellPosition.x;
      column += 1
    ) {
      totalPower += field[row - 1][column - 1];
    }
  }
  return totalPower;
};

export default findSquarePower;
