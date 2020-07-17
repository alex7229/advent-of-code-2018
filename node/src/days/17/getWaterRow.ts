import { Position, Field, Cell } from "./parseGround";
import getCellByPosition from "./getCellByPosition";

interface WaterFlow {
  // All the cells water can spread to on current row (they might get filled with water)
  // or just make sand wet (| symbol)
  wetCells: Cell[];
  // It is possible to get multiple falldown cells (at max 2), if water can spread equally right and left
  // If water can't fall down (bottom of a pit, that can be filled up), array will be empty
  falldownCells: Cell[];
  noMoreCells: boolean;
}

// returns all the cells water can spread to and cell, that water will fall to
export type GetWaterRow = (position: Position, field: Field) => WaterFlow;
const getWaterRow: GetWaterRow = (position, field) => {
  const wetCells: Cell[] = [];

  let currentColumn = position.column;
  let direction: "left" | "right" = "left";
  let leftWaterfallCell: Cell | null = null;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const currentCell = getCellByPosition(
      {
        column: currentColumn,
        row: position.row,
      },
      field
    );
    const cellUnderneath = getCellByPosition(
      {
        column: currentColumn,
        row: position.row + 1,
      },
      field
    );
    if (!currentCell) {
      throw new Error(`cannot find cell: ${JSON.stringify(position)}`);
    }
    if (!cellUnderneath) {
      // Reached the bottom of the field
      wetCells.push(currentCell);
      return { wetCells, falldownCells: [], noMoreCells: true };
    }
    if (currentCell.type === "clay" && direction === "left") {
      // We reached the left most cell the water can spread to
      direction = "right";
      currentColumn = position.column + 1;
      const nextCell = getCellByPosition(
        { row: position.row, column: currentColumn },
        field
      );
      if (!nextCell) {
        // Water falls down on the rightmost sand column
        return {
          wetCells,
          falldownCells: [cellUnderneath],
          noMoreCells: false,
        };
      }
      // eslint-disable-next-line no-continue
      continue;
    }
    if (currentCell.type === "clay" && direction === "right") {
      return {
        wetCells,
        falldownCells: leftWaterfallCell ? [leftWaterfallCell] : [],
        noMoreCells: false,
      };
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
      // Water will fall down here
      // If the direction is left, there may be another waterfall to the right, so the direction should be reversed
      wetCells.push(currentCell);
      if (direction === "right") {
        return {
          wetCells,
          falldownCells: leftWaterfallCell
            ? [leftWaterfallCell, cellUnderneath]
            : [cellUnderneath],
          noMoreCells: false,
        };
      }
      if (wetCells.length === 1) {
        // this is the first cell, so the flow of water should only go down
        // and not spread to the sides
        return {
          wetCells,
          falldownCells: [cellUnderneath],
          noMoreCells: false,
        };
      }
      leftWaterfallCell = cellUnderneath;
      currentColumn = position.column + 1;
      direction = "right";
    }
  }
};

export default getWaterRow;
