import { Position, Field, Cell } from "./parseGround";
import getCellByPosition from "./getCellByPosition";

interface WaterFlow {
  // All the cells water can spread to on current row (they might get filled with water)
  // or just make sand wet (| symbol)
  wetCells: Cell[];
  // If water can fall down, this cell will not be null
  falldownCell: Cell | null;
}

// returns all the cells water can spread to and cell, that water will fall to
type GetRow = (position: Position, field: Field) => WaterFlow;
const getRow: GetRow = (position, field) => {
  const wetCells: Cell[] = [];

  let currentColumn = position.column;
  let direction: "left" | "right" = "left";
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const currentCell = getCellByPosition(
      {
        column: currentColumn,
        row: position.row
      },
      field
    );
    const cellUnderneath = getCellByPosition(
      {
        column: currentColumn,
        row: position.row + 1
      },
      field
    );
    if (!currentCell) {
      throw new Error(`cannot find cell: ${JSON.stringify(position)}`);
    }
    if (!cellUnderneath) {
      // Reached the bottom of the field
      wetCells.push(currentCell);
      return { wetCells, falldownCell: null };
    }
    if (currentCell.type === "clay" && direction === "left") {
      direction = "right";
      currentColumn = position.column + 1;
      const nextCell = getCellByPosition(
        { row: position.row, column: currentColumn },
        field
      );
      if (!nextCell) {
        // Water falls down on the rightmost sand column
        return { wetCells, falldownCell: cellUnderneath };
      }
      // eslint-disable-next-line no-continue
      continue;
    }
    if (currentCell.type === "clay" && direction === "right") {
      return { wetCells, falldownCell: null };
    }
    if (cellUnderneath.type === "clay" || cellUnderneath.type === "water") {
      wetCells.push(currentCell);
      if (direction === "left") {
        currentColumn -= 1;
      } else {
        currentColumn += 1;
      }
      // eslint-disable-next-line no-continue
      continue;
    }
    if (cellUnderneath.type === "sand" || cellUnderneath.type === "wet sand") {
      // Water fill wall down here (ending the row)
      wetCells.push(currentCell);
      return { wetCells, falldownCell: cellUnderneath };
    }
  }
};

export default getRow;
