import findCellPower from "./findCellPower";
import { Position } from "../10/parseLightPoints";

type GenerateGrid = (
  width: number,
  height: number,
  serialNumber: number
) => ReadonlyArray<ReadonlyArray<number>>;

const generateGrid: GenerateGrid = (width, height, serialNumber) => {
  const field: number[][] = [];
  for (let row = 1; row <= height; row += 1) {
    const fullRow: number[] = [];
    for (let column = 1; column <= width; column += 1) {
      const position: Position = { x: column, y: row };
      fullRow.push(findCellPower(position, serialNumber));
    }
    field.push(fullRow);
  }
  return field;
};

export default generateGrid;
