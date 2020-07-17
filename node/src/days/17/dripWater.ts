import { Position, Field, Cell } from "./parseGround";
import getCellByPosition, { GetCellByPosition } from "./getCellByPosition";
import getWaterRow, { GetWaterRow } from "./getWaterRow";

// Moves one or more blocks of water down
// For the sake of performance this function mutates original field (instead of returning a copy)
// It returns next cells water will fall to, if any
type DripWater = (position: Position | null, field: Field) => Cell[];
type DripWaterFactory = (
  getWaterRow: GetWaterRow,
  getCellByPosition: GetCellByPosition
) => DripWater;

export const dripWaterFactory: DripWaterFactory = (
  getWaterRowFunc,
  getCellByPositionFunc
) => (position, field) => {
  if (!position || (position.column === 500 && position.row === 0)) {
    const cellUnderSpring = getCellByPositionFunc(
      { row: 1, column: 500 },
      field
    );
    if (cellUnderSpring) {
      cellUnderSpring.type = "water";
      return [cellUnderSpring];
    }
    return [];
  }
  const currentWaterCell = getCellByPositionFunc(position, field);
  if (!currentWaterCell) {
    throw new Error(`Cell wasn't found or it is not of water type`);
  }
  if (currentWaterCell.type !== "water") {
    // This means, that current row was already passed by another water flow
    // Water cannot stay here. This recursion path should be ignored
    return [];
  }
  const { falldownCells, wetCells, noMoreCells } = getWaterRowFunc(
    currentWaterCell.position,
    field
  );
  if (noMoreCells) {
    currentWaterCell.type = "wet sand";
    return [];
  }
  if (falldownCells.length === 0) {
    // reached the bottom of the well. Fill it up and return previous wet-sand cell
    wetCells.forEach((cell) => {
      // eslint-disable-next-line no-param-reassign
      cell.type = "water";
    });
    const previousCell = getCellByPositionFunc(
      {
        row: currentWaterCell.position.row - 1,
        column: currentWaterCell.position.column,
      },
      field
    );
    if (!previousCell) {
      throw new Error("Cell, from which water was dripping, should be present");
    }
    previousCell.type = "water";
    return [previousCell];
  }

  wetCells.forEach((cell) => {
    // eslint-disable-next-line no-param-reassign
    cell.type = "wet sand";
  });
  falldownCells.forEach((cell) => {
    cell.type = "water";
  });
  return falldownCells;
};

const dripWater: DripWater = dripWaterFactory(getWaterRow, getCellByPosition);
export default dripWater;
