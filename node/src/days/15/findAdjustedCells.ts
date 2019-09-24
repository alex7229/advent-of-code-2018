import { cloneDeep } from "lodash";
import { Battlefield, Unit, Cell } from "./parseBattlefield";

export interface Position {
  readonly row: number;
  readonly column: number;
}
type FindAdjustedCells = (
  field: Battlefield,
  position: Position,
  units: ReadonlyArray<Unit>
) => ReadonlyArray<Position>;

const findAdjustedCells: FindAdjustedCells = (field, position, units) => {
  const fieldCopy = cloneDeep(field) as Cell[][];
  units.forEach(unit => {
    fieldCopy[unit.position.row][unit.position.column] = "wall";
  });
  const adjustedCells: Position[] = [];
  const topCell =
    fieldCopy[position.row - 1] && fieldCopy[position.row - 1][position.column];
  const bottomCell =
    fieldCopy[position.row + 1] && fieldCopy[position.row + 1][position.column];
  const leftCell =
    fieldCopy[position.row] && fieldCopy[position.row][position.column - 1];
  const rightCell =
    fieldCopy[position.row] && fieldCopy[position.row][position.column + 1];
  if (topCell === "cavern") {
    adjustedCells.push({ row: position.row - 1, column: position.column });
  }
  if (bottomCell === "cavern") {
    adjustedCells.push({ row: position.row + 1, column: position.column });
  }
  if (leftCell === "cavern") {
    adjustedCells.push({ row: position.row, column: position.column - 1 });
  }
  if (rightCell === "cavern") {
    adjustedCells.push({ row: position.row, column: position.column + 1 });
  }
  return adjustedCells;
};

export default findAdjustedCells;
